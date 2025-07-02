import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { University, Department, MapPosition } from '../types';

// Kakao Maps API의 타입을 window 객체에 추가
declare global {
  interface Window {
    kakao: any;
  }
}

// 모달 컴포넌트의 props 타입 정의
interface UniversityModalProps {
  isOpen: boolean;
  onClose: () => void;
  university: University | null;
  department: Department | null;
}

/**
 * 대학교 상세 정보를 보여주는 모달 컴포넌트
 * 좌측에는 대학교 정보, 우측에는 카카오맵이 표시됩니다.
 */
const UniversityModal: React.FC<UniversityModalProps> = ({
  isOpen,
  onClose,
  university,
  department
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !university) return;

    // --- 진단 코드 시작 ---
    console.log("모달이 열렸습니다. 지도 설정을 시작합니다.");
    console.log("대학교 주소:", university.address);
    console.log("kakao 객체 로드 여부:", !!window.kakao);
    // --- 진단 코드 끝 ---

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 SDK가 로드되지 않았습니다. API 키와 네트워크 연결을 확인하세요.");
      return;
    }

    const mapContainer = mapRef.current;
    if (!mapContainer) {
      console.error("지도를 그릴 map acontainer (mapRef)를 찾을 수 없습니다.");
      return;
    }

    // --- 진단 코드: 컨테이너 크기 확인 ---
    console.log(
      "지도 컨테이너 크기:",
      `너비: ${mapContainer.offsetWidth}px`,
      `높이: ${mapContainer.offsetHeight}px`
    );

    const displayMap = (position: { lat: number; lng: number }) => {
      mapContainer.innerHTML = ''; // 이전 내용 지우기
      
      // 카카오맵 설정: level 12 = 가장 넓은 범위로 동아시아 전체를 볼 수 있는 줌 레벨
      const mapOption = {
        center: new window.kakao.maps.LatLng(position.lat, position.lng),
        level: 12, // 동아시아 전체가 보이는 가장 넓은 간격 (약 1024km)
      };

      console.log("🗺️ 지도 생성 시도:", mapOption);

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      map.relayout();

      // 지도 생성 후 실제 레벨 확인
      const actualLevel = map.getLevel();
      console.log("📍 설정된 레벨:", actualLevel);

      // 대학교 위치를 빨간색 마커로 표시
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(position.lat, position.lng),
      });
      marker.setMap(map);

      // 강제로 레벨 설정 시도
      map.setLevel(12);
      const finalLevel = map.getLevel();
      console.log("🎯 최종 레벨:", finalLevel);
    };

    const setupMap = () => {
      if (university.address) {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(university.address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
            const coords = {
              lat: parseFloat(result[0].y),
              lng: parseFloat(result[0].x),
            };
            console.log("주소 변환 성공:", coords);
            displayMap(coords);
          } else {
            console.error("주소 변환 실패:", status);
            mapContainer.innerHTML = '<div style="text-align: center; padding: 20px;">위치 정보를 찾을 수 없습니다.</div>';
          }
        });
      } else if (university.position && 'latitude' in university.position && 'longitude' in university.position) {
          const coords = {
            lat: university.position.latitude as number,
            lng: university.position.longitude as number,
          };
          console.log("좌표 정보 사용:", coords);
          displayMap(coords);
      } else {
        console.error("주소와 좌표 정보가 모두 없습니다.");
        mapContainer.innerHTML = '<div style="text-align: center; padding: 20px;">주소 정보가 없습니다.</div>';
      }
    };
    
    window.kakao.maps.load(setupMap);
    
  }, [isOpen, university]);

  // 모달이 열려있지 않거나 대학교 정보가 없으면 렌더링하지 않음
  if (!isOpen || !university) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <ModalContent>
          {/* 좌측: 대학교 정보 */}
          <InfoSection>
            <UniversityHeader>
              {university.logoUrl && (
                <LogoImage 
                  src={university.logoUrl} 
                  alt={`${university.name} 로고`}
                  onError={(e) => {
                    // 로고 이미지 로드 실패 시 기본 이미지 또는 텍스트로 대체
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <UniversityTitle>{university.name}</UniversityTitle>
              <UniversitySubtitle>{university.campusName}</UniversitySubtitle>
            </UniversityHeader>

            <InfoGrid>
              <InfoItem>
                <InfoLabel>주소</InfoLabel>
                <InfoValue>{university.address}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>설립유형</InfoLabel>
                <InfoValue>{university.estType}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>대학유형</InfoLabel>
                <InfoValue>{university.type}</InfoValue>
              </InfoItem>
              
              <InfoItem>
                <InfoLabel>지역</InfoLabel>
                <InfoValue>{university.region}</InfoValue>
              </InfoItem>

              {university.link && (
                <InfoItem>
                  <InfoLabel>홈페이지</InfoLabel>
                  <InfoValue>
                    <ExternalLink 
                      href={university.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      바로가기 →
                    </ExternalLink>
                  </InfoValue>
                </InfoItem>
              )}
            </InfoGrid>

            {/* 학과 정보 (해당하는 경우) */}
            {department && (
              <DepartmentSection>
                <SectionTitle>학과 정보</SectionTitle>
                <DepartmentInfo>
                  <DepartmentName>{department.departmentName}</DepartmentName>
                  <GradeInfo>
                    내신 등급: {department.minGrade}등급 - {department.maxGrade}등급
                  </GradeInfo>
                  <AdmissionType>
                    전형 유형: {department.admissionType === 'comprehensive' ? '학생부종합' : '학생부교과'}
                  </AdmissionType>
                  {department.curriculum && (
                    <CurriculumInfo>
                      <strong>주요 커리큘럼:</strong><br />
                      {department.curriculum}
                    </CurriculumInfo>
                  )}
                </DepartmentInfo>
              </DepartmentSection>
            )}
          </InfoSection>

          {/* 우측: 카카오맵 */}
          <MapSection>
            <SectionTitle>위치</SectionTitle>
            <MapContainer ref={mapRef} />
          </MapSection>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 1000px;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  z-index: 10;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const ModalContent = styled.div`
  display: flex;
  height: 70vh;
  min-height: 500px;
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  border-right: 1px solid #e5e7eb;
`;

const MapSection = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const UniversityHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e5e7eb;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 12px;
  border-radius: 8px;
`;

const UniversityTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #111827;
  margin: 8px 0;
`;

const UniversitySubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const ExternalLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DepartmentSection = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px solid #e5e7eb;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 16px;
`;

const DepartmentInfo = styled.div`
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
`;

const DepartmentName = styled.h4`
  font-size: 16px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 8px;
`;

const GradeInfo = styled.p`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 4px;
`;

const AdmissionType = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;

const CurriculumInfo = styled.p`
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
`;

const MapContainer = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
`;

export default UniversityModal; 
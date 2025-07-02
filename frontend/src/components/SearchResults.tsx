import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { SearchResult, SearchFilters, ModalState } from '../types';
import { searchUniversitiesByGrade } from '../services/universityService';
import UniversityModal from './UniversityModal';
import Pagination from './Pagination';

// 검색 결과 컴포넌트의 props 타입 정의
interface SearchResultsProps {
  grade: number;
  admissionType: 'comprehensive' | 'subject';
  departmentName?: string;
  filters?: SearchFilters;
  className?: string;
}

/**
 * 대학교 검색 결과를 이미지 카드 형태로 표시하는 컴포넌트
 * 카드를 클릭하면 상세 정보와 지도가 포함된 모달이 열립니다.
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  grade,
  admissionType,
  departmentName,
  filters,
  className
}) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    selectedUniversity: null,
    selectedDepartment: null
  });
  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 페이지에 보여줄 결과 수

  // 검색 조건이 바뀌면 항상 1페이지로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [grade, admissionType, departmentName, filters]);

  // 검색 조건이 변경될 때마다 검색 실행
  useEffect(() => {
    const fetchResults = async () => {
      // 내신 등급이 유효하지 않으면 검색하지 않음
      if (!grade || grade < 1.0 || grade > 9.0) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Firestore에서 대학교 검색 서비스 호출 (mock이 아닌 실제 DB)
        const searchResults = await searchUniversitiesByGrade(
          grade,
          admissionType,
          filters
        );
        
        // 학과명 필터링 (있는 경우)
        let filteredResults = searchResults;
        if (departmentName && departmentName.trim()) {
          const searchTerm = departmentName.toLowerCase().trim();
          filteredResults = searchResults.filter(result => 
            result.department.departmentName.toLowerCase().includes(searchTerm)
          );
        }
        
        setResults(filteredResults);
      } catch (err) {
        console.error('대학교 검색 실패:', err);
        setError('검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [grade, admissionType, departmentName, filters]);

  // 카드 클릭 핸들러 (모달 열기)
  const handleCardClick = (result: SearchResult) => {
    setModalState({
      isOpen: true,
      selectedUniversity: result.university,
      selectedDepartment: result.department
    });
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      selectedUniversity: null,
      selectedDepartment: null
    });
  };

  // 페이지에 따라 보여줄 결과만 잘라서 사용
  const pagedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 로딩 상태
  if (loading) {
    return (
      <Container className={className}>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>대학교 정보를 검색하고 있습니다...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <Container className={className}>
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={() => window.location.reload()}>
            다시 시도
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  // 검색 결과가 없는 경우
  if (results.length === 0) {
    return (
      <Container className={className}>
        <EmptyContainer>
          <EmptyIcon>🔍</EmptyIcon>
          <EmptyTitle>검색 결과가 없습니다</EmptyTitle>
          <EmptyText>
            입력하신 조건에 맞는 대학교를 찾을 수 없습니다.<br />
            내신 등급을 조정하거나 다른 전형 유형을 선택해보세요.
          </EmptyText>
        </EmptyContainer>
      </Container>
    );
  }

  // 검색 결과 표시
  return (
    <Container className={className}>
      <ResultHeader>
        <ResultCount>
          총 <strong>{results.length}개</strong>의 대학교가 검색되었습니다
        </ResultCount>
        <GradeInfo>
          내신 {grade}등급 • {admissionType === 'comprehensive' ? '학생부종합' : '학생부교과'}
        </GradeInfo>
      </ResultHeader>

      <CardGrid>
        {pagedResults.map((result, index) => (
          <UniversityCard 
            key={`${result.university.id}-${result.department.id}`}
            onClick={() => handleCardClick(result)}
            $isRecommended={result.isRecommended}
          >
            {/* 추천 배지 */}
            {result.isRecommended && (
              <RecommendedBadge>추천</RecommendedBadge>
            )}

            {/* 대학교 로고 이미지 */}
            <LogoContainer>
              {result.university.logoUrl ? (
                <LogoImage 
                  src={result.university.logoUrl} 
                  alt={`${result.university.name} 로고`}
                  onError={(e) => {
                    // 로고 로드 실패 시 기본 이미지로 대체
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <FallbackLogo style={{ display: result.university.logoUrl ? 'none' : 'flex' }}>
                🏫
              </FallbackLogo>
            </LogoContainer>

            {/* 카드 내용 */}
            <CardContent>
              <UniversityName>{result.university.name}</UniversityName>
              <DepartmentName>{result.department.departmentName}</DepartmentName>
              
              <InfoGrid>
                <InfoRow>
                  <InfoLabel>지역</InfoLabel>
                  <InfoValue>{result.university.region}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>내신 범위</InfoLabel>
                  <InfoValue>
                    {result.department.minGrade}등급 ~ {result.department.maxGrade}등급
                  </InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>매칭도</InfoLabel>
                  <InfoValue>
                    <MatchingScore $score={result.matchingGrade}>
                      {Math.round(result.matchingGrade * 100)}%
                    </MatchingScore>
                  </InfoValue>
                </InfoRow>
              </InfoGrid>

              <CardFooter>
                <EstTypeChip $estType={result.university.estType}>
                  {result.university.estType}
                </EstTypeChip>
                <ViewDetailText>클릭하여 상세보기</ViewDetailText>
              </CardFooter>
            </CardContent>
          </UniversityCard>
        ))}
      </CardGrid>

      {/* 페이지네이션 컴포넌트 추가 */}
      <Pagination
        currentPage={currentPage}
        totalItems={results.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* 모달 컴포넌트 */}
      <UniversityModal
        isOpen={modalState.isOpen}
        onClose={handleModalClose}
        university={modalState.selectedUniversity}
        department={modalState.selectedDepartment}
      />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 300px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 16px;
  color: #6b7280;
  font-size: 16px;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 300px;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 16px;
  text-align: center;
  margin-bottom: 24px;
`;

const RetryButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  min-height: 300px;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 8px;
`;

const EmptyText = styled.p`
  color: #6b7280;
  text-align: center;
  line-height: 1.6;
`;

const ResultHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
`;

const ResultCount = styled.h2`
  font-size: 20px;
  color: #111827;
  margin-bottom: 8px;
  
  strong {
    color: #3b82f6;
  }
`;

const GradeInfo = styled.p`
  color: #6b7280;
  font-size: 14px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const UniversityCard = styled.div<{ $isRecommended: boolean }>`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: ${props => props.$isRecommended ? '2px solid #10b981' : '1px solid #e5e7eb'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
`;

const LogoContainer = styled.div`
  height: 120px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LogoImage = styled.img`
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  border-radius: 8px;
`;

const FallbackLogo = styled.div`
  font-size: 48px;
  color: #9ca3af;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const UniversityName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 4px;
`;

const DepartmentName = styled.h4`
  font-size: 16px;
  color: #3b82f6;
  font-weight: 600;
  margin-bottom: 16px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const MatchingScore = styled.span<{ $score: number }>`
  color: ${props => {
    if (props.$score >= 0.8) return '#10b981';
    if (props.$score >= 0.6) return '#f59e0b';
    return '#ef4444';
  }};
  font-weight: 600;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
`;

const EstTypeChip = styled.span<{ $estType: string }>`
  background-color: ${props => {
    switch (props.$estType) {
      case '국립': return '#dbeafe';
      case '사립': return '#fef3c7';
      case '공립': return '#d1fae5';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.$estType) {
      case '국립': return '#1d4ed8';
      case '사립': return '#92400e';
      case '공립': return '#065f46';
      default: return '#374151';
    }
  }};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

const ViewDetailText = styled.span`
  font-size: 12px;
  color: #6b7280;
  font-style: italic;
`;

export default SearchResults; 
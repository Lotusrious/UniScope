import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import type { SearchFilters } from '../types';

// 필터 컴포넌트의 props 타입 정의
interface ResultFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
  className?: string;
  totalResults?: number;
}

/**
 * 검색 결과를 필터링하고 정렬하는 컴포넌트
 * 지역, 대학 유형, 설립 유형, 성적 범위 등의 필터 옵션을 제공합니다.
 */
const ResultFilters: React.FC<ResultFiltersProps> = ({
  onFilterChange,
  className,
  totalResults = 0
}) => {
  // 필터 상태 관리
  const [filters, setFilters] = useState<SearchFilters>({
    region: 'all',
    sortBy: 'grade',
    admissionType: 'subject',
    universityType: 'all',
    estType: 'all',
    gradeRange: {
      min: 1.0,
      max: 9.0
    }
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // 필터 변경 시 상위 컴포넌트에 전달
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // 개별 필터 변경 함수들
  const handleRegionChange = (region: string) => {
    setFilters(prev => ({ ...prev, region }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const handleUniversityTypeChange = (universityType: string) => {
    setFilters(prev => ({ ...prev, universityType }));
  };

  const handleEstTypeChange = (estType: string) => {
    setFilters(prev => ({ ...prev, estType }));
  };

  const handleGradeRangeChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      gradeRange: {
        ...prev.gradeRange!,
        [type]: value
      }
    }));
  };

  // 필터 초기화
  const handleResetFilters = () => {
    setFilters({
      region: 'all',
      sortBy: 'grade',
      admissionType: 'subject',
      universityType: 'all',
      estType: 'all',
      gradeRange: {
        min: 1.0,
        max: 9.0
      }
    });
  };

  return (
    <Container className={className}>
      <Header>
        <FilterTitle>
          검색 필터 <ResultCount>({totalResults}개 결과)</ResultCount>
        </FilterTitle>
        <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '접기' : '더보기'} {isExpanded ? '▲' : '▼'}
        </ToggleButton>
      </Header>

      <FilterContent $isExpanded={isExpanded}>
        {/* 주요 필터 (항상 표시) */}
        <MainFilters>
          <FilterGroup>
            <FilterLabel>정렬 기준</FilterLabel>
            <Select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="grade">내신 등급순</option>
              <option value="name">대학명순</option>
              <option value="region">지역순</option>
              <option value="match">매칭도순</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>지역</FilterLabel>
            <Select
              value={filters.region}
              onChange={(e) => handleRegionChange(e.target.value)}
            >
              <option value="all">전체 지역</option>
              <option value="서울특별시">서울특별시</option>
              <option value="경기도">경기도</option>
              <option value="인천광역시">인천광역시</option>
              <option value="부산광역시">부산광역시</option>
              <option value="대구광역시">대구광역시</option>
              <option value="광주광역시">광주광역시</option>
              <option value="대전광역시">대전광역시</option>
              <option value="울산광역시">울산광역시</option>
              <option value="세종특별자치시">세종시</option>
              <option value="강원도">강원도</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="전라북도">전라북도</option>
              <option value="전라남도">전라남도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="제주특별자치도">제주도</option>
            </Select>
          </FilterGroup>
        </MainFilters>

        {/* 고급 필터 (확장 시 표시) */}
        <AdvancedFilters $isExpanded={isExpanded}>
          <FilterRow>
            <FilterGroup>
              <FilterLabel>대학 유형</FilterLabel>
              <Select
                value={filters.universityType}
                onChange={(e) => handleUniversityTypeChange(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="일반대학">일반대학 (4년제)</option>
                <option value="전문대학">전문대학 (2-3년제)</option>
                <option value="교육대학">교육대학</option>
                <option value="산업대학">산업대학</option>
              </Select>
            </FilterGroup>

            <FilterGroup>
              <FilterLabel>설립 유형</FilterLabel>
              <Select
                value={filters.estType}
                onChange={(e) => handleEstTypeChange(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="국립">국립</option>
                <option value="공립">공립</option>
                <option value="사립">사립</option>
              </Select>
            </FilterGroup>
          </FilterRow>

          <FilterGroup>
            <FilterLabel>내신 등급 범위</FilterLabel>
            <GradeRangeContainer>
              <GradeInput>
                <GradeLabel>최소</GradeLabel>
                <RangeInput
                  type="range"
                  min="1.0"
                  max="9.0"
                  step="0.1"
                  value={filters.gradeRange?.min || 1.0}
                  onChange={(e) => handleGradeRangeChange('min', parseFloat(e.target.value))}
                />
                <GradeValue>{filters.gradeRange?.min || 1.0}등급</GradeValue>
              </GradeInput>
              
              <GradeInput>
                <GradeLabel>최대</GradeLabel>
                <RangeInput
                  type="range"
                  min="1.0"
                  max="9.0"
                  step="0.1"
                  value={filters.gradeRange?.max || 9.0}
                  onChange={(e) => handleGradeRangeChange('max', parseFloat(e.target.value))}
                />
                <GradeValue>{filters.gradeRange?.max || 9.0}등급</GradeValue>
              </GradeInput>
            </GradeRangeContainer>
          </FilterGroup>

          <ActionButtons>
            <ResetButton onClick={handleResetFilters}>
              🔄 필터 초기화
            </ResetButton>
          </ActionButtons>
        </AdvancedFilters>
      </FilterContent>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
`;

const FilterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ResultCount = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 400;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #eff6ff;
  }
`;

const FilterContent = styled.div<{ $isExpanded: boolean }>`
  padding: 20px;
`;

const MainFilters = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const AdvancedFilters = styled.div<{ $isExpanded: boolean }>`
  max-height: ${props => props.$isExpanded ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  
  ${props => props.$isExpanded && `
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  `}
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

const GradeRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GradeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GradeLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
  min-width: 30px;
  font-weight: 500;
`;

const RangeInput = styled.input`
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const GradeValue = styled.span`
  font-size: 12px;
  color: #374151;
  font-weight: 600;
  min-width: 50px;
  text-align: right;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
`;

const ResetButton = styled.button`
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e7eb;
    color: #374151;
  }
`;

export default ResultFilters; 
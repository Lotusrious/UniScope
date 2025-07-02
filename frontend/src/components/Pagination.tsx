import React from 'react';
import styled from 'styled-components';

// Pagination 컴포넌트의 props 타입 정의
interface PaginationProps {
  currentPage: number; // 현재 페이지 번호 (1부터 시작)
  totalItems: number; // 전체 아이템 수
  itemsPerPage: number; // 페이지당 아이템 수
  onPageChange: (page: number) => void; // 페이지 변경 핸들러
  className?: string;
}

/**
 * 페이지네이션 컴포넌트
 * 검색 결과를 여러 페이지로 나누어 표시할 때 사용
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className
}) => {
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  if (totalPages <= 1) {
    return null;
  }

  // 표시할 페이지 번호 범위 계산 (현재 페이지 기준 전후 2페이지)
  const getPageNumbers = () => {
    const delta = 2; // 현재 페이지 기준 전후로 보여줄 페이지 수
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // 첫 번째 페이지 항상 표시
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    // 중간 범위 추가
    rangeWithDots.push(...range);

    // 마지막 페이지 항상 표시
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <PaginationContainer className={className}>
      {/* 이전 페이지 버튼 */}
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        $isArrow={true}
      >
        ← 이전
      </PaginationButton>

      {/* 페이지 번호들 */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <Dots>...</Dots>
          ) : (
            <PaginationButton
              onClick={() => onPageChange(page as number)}
              $isActive={currentPage === page}
              disabled={false}
            >
              {page}
            </PaginationButton>
          )}
        </React.Fragment>
      ))}

      {/* 다음 페이지 버튼 */}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        $isArrow={true}
      >
        다음 →
      </PaginationButton>
    </PaginationContainer>
  );
};

// Styled Components
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  padding: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.25rem;
    margin: 1.5rem 0;
    padding: 0.5rem;
  }
`;

const PaginationButton = styled.button<{
  $isActive?: boolean;
  $isArrow?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  padding: ${props => props.$isArrow ? '0 1rem' : '0 0.5rem'};
  background: ${props => 
    props.$isActive 
      ? '#4f46e5' 
      : props.disabled 
        ? '#f9fafb' 
        : 'white'
  };
  color: ${props => 
    props.$isActive 
      ? 'white' 
      : props.disabled 
        ? '#9ca3af' 
        : '#374151'
  };
  border: 1px solid ${props => 
    props.$isActive 
      ? '#4f46e5' 
      : props.disabled 
        ? '#e5e7eb' 
        : '#d1d5db'
  };
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: ${props => props.$isActive ? '#4338ca' : '#f3f4f6'};
    border-color: ${props => props.$isActive ? '#4338ca' : '#9ca3af'};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  
  @media (max-width: 768px) {
    min-width: 2rem;
    height: 2rem;
    padding: ${props => props.$isArrow ? '0 0.75rem' : '0 0.25rem'};
    font-size: 0.75rem;
  }
`;

const Dots = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  height: 2.5rem;
  color: #9ca3af;
  font-weight: 500;
  
  @media (max-width: 768px) {
    min-width: 2rem;
    height: 2rem;
    font-size: 0.75rem;
  }
`;

export default Pagination; 
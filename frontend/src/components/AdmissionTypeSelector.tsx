import React from 'react';
import styled from 'styled-components';

// 전형 유형 선택 컴포넌트의 props 타입 정의
interface AdmissionTypeSelectorProps {
  selectedType: 'comprehensive' | 'subject';
  onTypeChange: (type: 'comprehensive' | 'subject') => void;
  className?: string;
}

/**
 * 전형 유형을 선택하는 컴포넌트
 * 학생부종합과 학생부교과 중 하나를 선택할 수 있습니다.
 */
const AdmissionTypeSelector: React.FC<AdmissionTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
  className
}) => {
  return (
    <Container className={className}>
      <Title>전형 유형 선택</Title>
      <Description>
        지원하고 싶은 전형 유형을 선택해주세요
      </Description>
      
      <TabContainer>
        <TabButton
          $isActive={selectedType === 'comprehensive'}
          onClick={() => onTypeChange('comprehensive')}
        >
          <TabIcon>📝</TabIcon>
          <TabTitle>학생부종합</TabTitle>
          <TabSubtitle>종합적 평가</TabSubtitle>
        </TabButton>
        
        <TabButton
          $isActive={selectedType === 'subject'}
          onClick={() => onTypeChange('subject')}
        >
          <TabIcon>📊</TabIcon>
          <TabTitle>학생부교과</TabTitle>
          <TabSubtitle>내신 성적 중심</TabSubtitle>
        </TabButton>
      </TabContainer>
      
      <InfoText>
        {selectedType === 'comprehensive' ? (
          <span>
            <strong>학생부종합:</strong> 내신, 비교과 활동, 자기소개서 등을 종합적으로 평가합니다.
          </span>
        ) : (
          <span>
            <strong>학생부교과:</strong> 주로 내신 성적을 중심으로 평가합니다.
          </span>
        )}
      </InfoText>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  width: 100%;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
  text-align: center;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  text-align: center;
  line-height: 1.4;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 16px;
  border: 2px solid ${props => props.$isActive ? '#4f46e5' : '#e5e7eb'};
  border-radius: 12px;
  background: ${props => props.$isActive ? '#f0f9ff' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  
  &:hover {
    border-color: #4f46e5;
    background: ${props => props.$isActive ? '#f0f9ff' : '#f9fafb'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 14px;
  }
`;

const TabIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 6px;
  }
`;

const TabTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const TabSubtitle = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.3;
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const InfoText = styled.div`
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 13px;
  color: #475569;
  line-height: 1.4;
  
  strong {
    color: #1e293b;
    font-weight: 600;
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 12px;
  }
`;

export default AdmissionTypeSelector; 
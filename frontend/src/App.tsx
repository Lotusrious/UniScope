import React, { useState } from 'react';
import styled from 'styled-components';
import InputForm from "./components/InputForm";
import AdmissionTypeSelector from './components/AdmissionTypeSelector';
import SearchResults from './components/SearchResults';
import ResultFilters from './components/ResultFilters';
import type { SearchFilters } from './types';

// Styled Components
const AppContainer = styled.div`
  background-color: #f3f4f6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  margin: 0.75rem 0 0 0;
  font-size: 1.125rem;
  color: #6b7280;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 900px;
  padding: 0 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  // 상태 관리
  const [grade, setGrade] = useState<number>(0);
  const [admissionType, setAdmissionType] = useState<'comprehensive' | 'subject'>('subject');
  const [departmentName, setDepartmentName] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
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

  // InputForm에서 데이터를 받았을 때 호출되는 함수
  const handleFormSubmit = (formData: {
    grade: number;
    departmentName?: string;
  }) => {
    setGrade(formData.grade);
    setDepartmentName(formData.departmentName || '');
    setShowResults(true);
  };

  // 전형 유형이 변경될 때
  const handleAdmissionTypeChange = (type: 'comprehensive' | 'subject') => {
    setAdmissionType(type);
    setFilters(prev => ({ ...prev, admissionType: type }));
  };

  // 새로운 검색을 위해 초기화
  const handleReset = () => {
    setShowResults(false);
    setGrade(0);
    setDepartmentName('');
  };

  return (
    <AppContainer>
      <Header>
        <Title>UniScope</Title>
        <Subtitle>당신의 성적에 맞는 대학교를 찾아보세요!</Subtitle>
      </Header>
      
      <Main>
        {!showResults ? (
          // 입력 단계
          <InputSection>
            <AdmissionTypeSelector
              selectedType={admissionType}
              onTypeChange={handleAdmissionTypeChange}
            />
            <InputForm 
              onSubmit={handleFormSubmit}
              admissionType={admissionType}
            />
          </InputSection>
        ) : (
          // 결과 단계
          <ResultSection>
            <SearchHeader>
              <BackButton onClick={handleReset}>
                ← 새로운 검색
              </BackButton>
              <SearchInfo>
                <SearchTitle>검색 결과</SearchTitle>
                <SearchSubtitle>
                  내신 {grade}등급 • {admissionType === 'comprehensive' ? '학생부종합' : '학생부교과'}
                  {departmentName && ` • ${departmentName}`}
                </SearchSubtitle>
              </SearchInfo>
            </SearchHeader>
            
                      <ResultFilters
            onFilterChange={setFilters}
            totalResults={0} // TODO: 실제 결과 수로 업데이트
          />
          
          <SearchResults
            grade={grade}
            admissionType={admissionType}
            departmentName={departmentName}
            filters={filters}
          />
          </ResultSection>
        )}
      </Main>
    </AppContainer>
  )
}

// Styled Components
const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding-bottom: 2rem;
`;

const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 2rem;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  
  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SearchInfo = styled.div`
  flex: 1;
`;

const SearchTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SearchSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
`;

export default App

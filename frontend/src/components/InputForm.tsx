import React, { useState } from 'react';
import styled from 'styled-components';

// InputForm props 타입 정의
interface InputFormProps {
  onSubmit: (formData: {
    grade: number;
    departmentName?: string;
  }) => void;
  admissionType: 'comprehensive' | 'subject';
  className?: string;
}

const InputForm: React.FC<InputFormProps> = ({ 
  onSubmit, 
  admissionType,
  className 
}) => {
  const [grade, setGrade] = useState<string>('');
  const [departmentName, setDepartmentName] = useState<string>('');
  const [errors, setErrors] = useState<{
    grade?: string;
    departmentName?: string;
  }>({});

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    const newErrors: { grade?: string; departmentName?: string } = {};
    
    const gradeNumber = parseFloat(grade);
    if (!grade || isNaN(gradeNumber) || gradeNumber < 1.0 || gradeNumber > 9.0) {
      newErrors.grade = '내신 등급은 1.0 ~ 9.0 사이의 숫자여야 합니다.';
    }
    
    if (departmentName.trim() && departmentName.trim().length < 2) {
      newErrors.departmentName = '학과명은 2글자 이상 입력해주세요.';
    }
    
    setErrors(newErrors);
    
    // 오류가 없으면 제출
    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        grade: gradeNumber,
        departmentName: departmentName.trim() || undefined
      });
    }
  };

  // 내신 등급 입력 처리
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGrade(value);
    
    // 실시간 유효성 검사
    if (errors.grade) {
      const gradeNumber = parseFloat(value);
      if (value && !isNaN(gradeNumber) && gradeNumber >= 1.0 && gradeNumber <= 9.0) {
        setErrors(prev => ({ ...prev, grade: undefined }));
      }
    }
  };

  // 학과명 입력 처리
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepartmentName(value);
    
    // 실시간 유효성 검사
    if (errors.departmentName && value.trim().length >= 2) {
      setErrors(prev => ({ ...prev, departmentName: undefined }));
    }
  };

  return (
    <FormContainer className={className}>
      <Title>정보 입력</Title>
      <Description>
        {admissionType === 'comprehensive' 
          ? '학생부종합전형 기준으로 대학교를 추천해드립니다.' 
          : '학생부교과전형 기준으로 대학교를 추천해드립니다.'
        }
      </Description>
      
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="departmentName">
            희망 학과 <OptionalText>(선택사항)</OptionalText>
          </Label>
          <Input
            type="text"
            name="departmentName"
            id="departmentName"
            placeholder="예: 컴퓨터공학과, 경영학과"
            value={departmentName}
            onChange={handleDepartmentChange}
            $hasError={!!errors.departmentName}
          />
          {errors.departmentName && (
            <ErrorText>{errors.departmentName}</ErrorText>
          )}
          <HelpText>
            특정 학과를 입력하면 해당 학과가 있는 대학교만 검색됩니다.
          </HelpText>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="grade">
            평균 내신 등급 <RequiredText>*</RequiredText>
          </Label>
          <Input
            type="number"
            name="grade"
            id="grade"
            placeholder="1.0 ~ 9.0"
            step="0.01"
            min="1"
            max="9"
            value={grade}
            onChange={handleGradeChange}
            $hasError={!!errors.grade}
            required
          />
          {errors.grade && (
            <ErrorText>{errors.grade}</ErrorText>
          )}
          <HelpText>
            1.0등급(최고)부터 9.0등급(최저)까지 입력 가능합니다.
          </HelpText>
        </FormGroup>

        <SubmitButtonGroup>
          <SubmitButton type="submit">
            🔍 대학교 찾아보기
          </SubmitButton>
        </SubmitButtonGroup>
      </StyledForm>
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.div`
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin: 0 0 1.5rem 0;
  line-height: 1.4;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const OptionalText = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 400;
`;

const RequiredText = styled.span`
  color: #ef4444;
  font-weight: 600;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;
  font-size: 0.875rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#4f46e5'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(79, 70, 229, 0.1)'};
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::before {
    content: '⚠️';
    font-size: 0.75rem;
  }
`;

const HelpText = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  line-height: 1.3;
`;

const SubmitButtonGroup = styled.div`
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: linear-gradient(135deg, #4338ca, #6d28d9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default InputForm; 
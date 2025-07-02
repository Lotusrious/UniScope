// 임시로 Firebase와 커리어넷 API 대신 정적 데이터 사용
// import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';
// import type { DocumentData } from 'firebase/firestore';
// import { db } from '../firebase';
import type { University, Department, SearchResult, SearchFilters } from '../types';
// import { searchUniversities, REGION_CODES } from './careerNetApi';

// 임시 데이터 import
import { 
  mockUniversities, 
  getMockUniversitiesByRegion, 
  getMockUniversitiesByType,
  searchMockUniversitiesByName 
} from '../data/mockUniversities';
import { 
  mockAdmissionData,
  getMockDepartmentsByUniversity,
  getMockDepartmentsByGrade,
  sortMockDepartments 
} from '../data/mockAdmissionData';

/**
 * 특정 대학교의 학과별 내신 성적 정보를 가져오는 함수 (임시 데이터 사용)
 * @param universityName 대학교 이름
 * @returns 해당 대학교의 학과 정보 배열
 */
export async function getDepartmentsByUniversity(universityName: string): Promise<Department[]> {
  try {
    // 임시 데이터에서 해당 대학교의 학과 정보 가져오기
    const departments = getMockDepartmentsByUniversity(universityName);
    
    // 실제 API에서는 비동기 처리가 필요하므로 Promise로 래핑
    return Promise.resolve(departments);
  } catch (error) {
    console.error('대학교 학과 정보 조회 실패:', error);
    throw new Error(`${universityName}의 학과 정보를 가져오는데 실패했습니다.`);
  }
}

/**
 * 내신 성적과 전형 유형에 따라 지원 가능한 대학교들을 검색하는 함수
 * @param grade 사용자의 내신 등급 (1.0 ~ 9.0)
 * @param admissionType 전형 유형 ('comprehensive' | 'subject')
 * @param filters 추가 검색 필터 (지역, 정렬 등)
 * @returns 지원 가능한 대학교와 학과 정보가 결합된 검색 결과
 */
export async function searchUniversitiesByGrade(
  grade: number,
  admissionType: 'comprehensive' | 'subject',
  filters?: SearchFilters
): Promise<SearchResult[]> {
  try {
    // 1. 내신 성적으로 지원 가능한 학과들 먼저 찾기
    const eligibleDepartments = getMockDepartmentsByGrade(grade, admissionType);
    
    // 2. 해당 학과들의 대학교 정보 가져오기
    const results: SearchResult[] = [];
    
    for (const department of eligibleDepartments) {
      // 대학교 정보 찾기
      const university = mockUniversities.find(uni => uni.name === department.universityName);
      
      if (university) {
        // 지역 필터 적용 (있는 경우)
        if (filters?.region && filters.region !== 'all') {
          if (!university.region.includes(filters.region)) {
            continue; // 지역이 맞지 않으면 제외
          }
        }
        
        // 대학 유형 필터 적용 (있는 경우)
        if (filters?.universityType && filters.universityType !== 'all') {
          if (university.type !== filters.universityType) {
            continue; // 대학 유형이 맞지 않으면 제외
          }
        }
        
        // 설립 유형 필터 적용 (있는 경우)
        if (filters?.estType && filters.estType !== 'all') {
          if (university.estType !== filters.estType) {
            continue; // 설립 유형이 맞지 않으면 제외
          }
        }
        
        // 내신 등급 범위 필터 적용 (있는 경우)
        if (filters?.gradeRange) {
          if (grade < filters.gradeRange.min || grade > filters.gradeRange.max) {
            continue; // 사용자 성적이 필터 범위에 맞지 않으면 제외
          }
        }
        
        // 사용자 성적이 해당 학과 범위에 얼마나 적합한지 계산
        const gradeScore = calculateGradeMatchScore(grade, department);
        
        results.push({
          university,
          department,
          matchingGrade: gradeScore,
          isRecommended: gradeScore >= 0.8 // 80% 이상 매칭되면 추천
        });
      }
    }
    
    // 3. 정렬 적용
    const sortedResults = sortSearchResults(results, filters?.sortBy || 'grade');
    
    return Promise.resolve(sortedResults);
  } catch (error) {
    console.error('대학교 검색 실패:', error);
    throw new Error('대학교 검색 중 오류가 발생했습니다.');
  }
}

/**
 * 지역별로 대학교를 필터링하는 함수
 * @param region 지역명 ('서울', '경기', '부산' 등)
 * @returns 해당 지역의 대학교 목록
 */
export async function getUniversitiesByRegion(region?: string): Promise<University[]> {
  try {
    const universities = getMockUniversitiesByRegion(region);
    return Promise.resolve(universities);
  } catch (error) {
    console.error('지역별 대학교 조회 실패:', error);
    throw new Error('지역별 대학교 정보를 가져오는데 실패했습니다.');
  }
}

/**
 * 대학교 이름으로 검색하는 함수
 * @param searchTerm 검색어 (대학교 이름)
 * @returns 검색 결과 대학교 목록
 */
export async function searchUniversitiesByName(searchTerm: string): Promise<University[]> {
  try {
    const universities = searchMockUniversitiesByName(searchTerm);
    return Promise.resolve(universities);
  } catch (error) {
    console.error('대학교 이름 검색 실패:', error);
    throw new Error('대학교 검색 중 오류가 발생했습니다.');
  }
}

/**
 * 종합적인 대학교 검색 함수 (메인 검색 함수)
 * @param grade 내신 등급
 * @param admissionType 전형 유형
 * @param departmentName 희망 학과명 (선택사항)
 * @param filters 추가 필터
 * @returns 검색 결과
 */
export async function comprehensiveUniversitySearch(
  grade: number,
  admissionType: 'comprehensive' | 'subject',
  departmentName?: string,
  filters?: SearchFilters
): Promise<SearchResult[]> {
  try {
    let results = await searchUniversitiesByGrade(grade, admissionType, filters);
    
    // 특정 학과명이 지정된 경우 필터링
    if (departmentName && departmentName.trim()) {
      const searchTerm = departmentName.toLowerCase().trim();
      results = results.filter(result => 
        result.department.departmentName.toLowerCase().includes(searchTerm)
      );
    }
    
    return results;
  } catch (error) {
    console.error('종합 대학교 검색 실패:', error);
    throw new Error('대학교 검색 중 오류가 발생했습니다.');
  }
}

/**
 * 사용자 성적과 학과 요구 성적 간의 매칭 점수를 계산하는 함수
 * @param userGrade 사용자 내신 등급
 * @param department 학과 정보
 * @returns 매칭 점수 (0.0 ~ 1.0)
 */
function calculateGradeMatchScore(userGrade: number, department: Department): number {
  const { minGrade, maxGrade } = department;
  
  // 사용자 성적이 범위 밖인 경우
  if (userGrade < minGrade || userGrade > maxGrade) {
    return 0;
  }
  
  // 성적 범위 내에서의 위치 계산 (성적이 좋을수록 높은 점수)
  const gradeRange = maxGrade - minGrade;
  if (gradeRange === 0) {
    return 1.0; // 정확히 일치하는 경우
  }
  
  // 낮은 등급(좋은 성적)일수록 높은 점수
  const normalizedPosition = (maxGrade - userGrade) / gradeRange;
  return Math.max(0.5, normalizedPosition); // 최소 0.5점 보장
}

/**
 * 검색 결과를 정렬하는 함수
 * @param results 검색 결과 배열
 * @param sortBy 정렬 기준
 * @returns 정렬된 검색 결과
 */
function sortSearchResults(results: SearchResult[], sortBy: 'grade' | 'name' | 'region' | 'match'): SearchResult[] {
  return [...results].sort((a, b) => {
    switch (sortBy) {
      case 'grade':
        // 내신 등급 기준으로 정렬 (낮은 등급이 먼저)
        return a.department.minGrade - b.department.minGrade;
        
      case 'name':
        // 대학교 이름 순으로 정렬
        return a.university.name.localeCompare(b.university.name);
        
      case 'region':
        // 지역 순으로 정렬
        return a.university.region.localeCompare(b.university.region);
        
      case 'match':
        // 매칭 점수가 높은 순으로 정렬
        return b.matchingGrade - a.matchingGrade;
        
      default:
        // 기본값: 매칭 점수 기준
        return b.matchingGrade - a.matchingGrade;
    }
  });
}

/**
 * 사용 가능한 지역 목록을 반환하는 함수
 * @returns 지역 코드와 이름 매핑 객체
 */
export function getAvailableRegions(): Record<string, string> {
  return {
    'all': '전체',
    'seoul': '서울특별시',
    'gyeonggi': '경기도',
    'incheon': '인천광역시',
    'busan': '부산광역시',
    'daegu': '대구광역시',
    'daejeon': '대전광역시',
    'gwangju': '광주광역시',
    'chungnam': '충청남도',
    'gangwon': '강원도',
    'jeju': '제주도'
  };
} 
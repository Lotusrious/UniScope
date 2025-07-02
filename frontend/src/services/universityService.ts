import { collection, query, where, getDocs } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import type { University, Department, UniversityDepartment, SearchResult, SearchFilters } from '../types';

/**
 * Firestore에서 모든 대학교 정보를 가져오는 함수
 * @returns 모든 대학교 정보 배열
 */
async function getAllUniversities(): Promise<University[]> {
  const universitiesCol = collection(db, 'universities');
  const universitySnapshot = await getDocs(universitiesCol);
  const universityList = universitySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as University));
  return universityList;
}



/**
 * 내신 성적과 전형 유형에 따라 지원 가능한 대학교들을 Firestore에서 검색하는 함수
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
    console.log('🔍 검색 시작:', { grade, admissionType, filters });
    
    // 1. Firestore에서 모든 대학교 정보 가져오기
    const allUniversities = await getAllUniversities();
    console.log('📚 로드된 대학교 수:', allUniversities.length);
    console.log('📚 첫 번째 대학교 데이터 샘플:', allUniversities[0]);

    // 2. 각 대학교의 학과 정보에서 내신 성적에 맞는 것들 찾기
    const results: SearchResult[] = [];

    for (const university of allUniversities) {
      // 각 대학교의 departments 배열을 확인
      if (university.departments && Array.isArray(university.departments)) {
        console.log(`🏫 ${university.name}의 학과 수:`, university.departments.length);
        
        for (const department of university.departments) {
          console.log(`📖 학과 확인:`, {
            name: department.departmentName,
            minGrade: department.minGrade,
            maxGrade: department.maxGrade,
            userGrade: grade
          });
          
                     // 내신 성적이 학과 요구 범위에 맞는지 확인
           if (grade >= department.minGrade && grade <= department.maxGrade) {
             console.log(`✅ 조건 만족한 학과:`, department.departmentName);
             
             // 추가 필터링 로직 (지역, 대학유형 등)
             if (filters?.region && filters.region !== 'all' && !university.region.includes(filters.region)) continue;
             if (filters?.universityType && filters.universityType !== 'all' && university.type !== filters.universityType) continue;
             if (filters?.estType && filters.estType !== 'all' && university.estType !== filters.estType) continue;

             // UniversityDepartment를 Department로 변환
             const fullDepartment: Department = {
               id: department.id,
               universityName: university.name,
               departmentName: department.departmentName,
               admissionType: admissionType, // 검색할 때 전달받은 전형 유형 사용
               minGrade: department.minGrade,
               maxGrade: department.maxGrade
             };

             const gradeScore = calculateGradeMatchScore(grade, fullDepartment);
             
             results.push({
               university,
               department: fullDepartment,
               matchingGrade: gradeScore,
               isRecommended: gradeScore >= 0.8
             });
           }
        }
      }
    }
    
    console.log('🎯 검색 결과 수:', results.length);
    
    // 4. 정렬 적용
    return sortSearchResults(results, filters?.sortBy || 'grade');

  } catch (error) {
    console.error('❌ Firestore 기반 대학교 검색 실패:', error);
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
    // 이제 이 함수는 Firestore 기반의 searchUniversitiesByGrade를 호출합니다.
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
  
  if (userGrade < minGrade || userGrade > maxGrade) return 0;
  
  const gradeRange = maxGrade - minGrade;
  if (gradeRange === 0) return 1.0;
  
  const normalizedPosition = (maxGrade - userGrade) / gradeRange;
  return Math.max(0.5, normalizedPosition);
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
        return a.department.minGrade - b.department.minGrade;
      case 'name':
        return a.university.name.localeCompare(b.university.name);
      case 'region':
        return a.university.region.localeCompare(b.university.region);
      case 'match':
        return b.matchingGrade - a.matchingGrade;
      default:
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
    'ulsan': '울산광역시',
    'sejong': '세종특별자치시',
    'gangwon': '강원도',
    'chungbuk': '충청북도',
    'chungnam': '충청남도',
    'jeonbuk': '전라북도',
    'jeonnam': '전라남도',
    'gyeongbuk': '경상북도',
    'gyeongnam': '경상남도',
    'jeju': '제주특별자치도',
  };
} 
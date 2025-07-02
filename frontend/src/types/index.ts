// 커리어넷 API 응답 타입 정의
export interface CareerNetUniversity {
  seq: string;                    // 시퀀스 (고유 ID)
  schoolName: string;             // 학교명
  schoolGubun: string;            // 학교구분 (대학교, 전문대학 등)
  schoolType: string;             // 학교유형 (일반대학, 전문대학 등)
  estType: string;                // 설립유형 (국립, 사립, 공립)
  region: string;                 // 지역
  adres: string;                  // 주소
  link?: string;                  // 학교 홈페이지 링크
  collegeinfourl?: string;        // 대학정보 URL
  campusName?: string;            // 캠퍼스명
}

// 대학교 정보 타입 정의 (통합된 형태)
export interface University {
  id: string;
  name: string;       // 대학교 이름
  address: string;    // 대학교 주소
  region: string;     // 지역 정보
  type: string;       // 대학 유형 (일반대학, 전문대학 등)
  estType: string;    // 설립유형 (국립, 사립, 공립)
  link?: string;      // 홈페이지 링크
  campusName?: string; // 캠퍼스명
  logoUrl?: string;   // 대학교 로고 이미지 URL
  position?: MapPosition; // 지도상 위치 (위도, 경도)
}

// 학과 정보 타입 정의
export interface Department {
  id: string;
  universityName: string;     // 대학교 이름
  departmentName: string;     // 학과 이름
  admissionType: 'comprehensive' | 'subject';  // 전형 유형
  minGrade: number;          // 최소 내신 등급
  maxGrade: number;          // 최대 내신 등급
  curriculum?: string;       // 커리큘럼 정보
}

// 검색 필터 타입 정의
export interface SearchFilters {
  region?: string;           // 지역 필터 ('all', 'seoul', 'gyeonggi' 등)
  sortBy: 'grade' | 'name' | 'region' | 'match';  // 정렬 기준
  admissionType: 'comprehensive' | 'subject';  // 전형 유형
  universityType?: string;   // 대학 유형 필터 (일반대학, 전문대학 등)
  estType?: string;          // 설립 유형 필터 (국립, 사립, 공립)
  gradeRange?: {             // 내신 등급 범위 필터
    min: number;
    max: number;
  };
}

// 검색 결과 타입 정의
export interface SearchResult {
  university: University;
  department: Department;
  matchingGrade: number;     // 사용자 성적과 매칭되는 등급
  isRecommended: boolean;    // 추천 여부 (매칭도가 높은 경우 true)
}

// API 응답 타입 정의
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// 지도 관련 타입 정의
export interface MapPosition {
  lat: number;              // 위도
  lng: number;              // 경도
}

// 카카오맵 관련 타입 (전역 객체)
declare global {
  interface Window {
    kakao: any;
  }
}

// 모달 상태 타입
export interface ModalState {
  isOpen: boolean;
  selectedUniversity: University | null;
  selectedDepartment: Department | null;
} 
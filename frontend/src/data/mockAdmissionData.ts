import type { Department } from '../types';

/**
 * 임시 학과별 내신 성적 데이터
 * 실제 입시 데이터 수집 전까지 사용할 모의 데이터입니다.
 * 내신 등급은 대략적인 추정치이며, 실제와 다를 수 있습니다.
 */
export const mockAdmissionData: Department[] = [
  // 서울대학교 - 매우 높은 수준 (1-2등급)
  {
    id: 'snu-cs',
    universityName: '서울대학교',
    departmentName: '컴퓨터공학부',
    admissionType: 'comprehensive',
    minGrade: 1.0,
    maxGrade: 1.5,
    curriculum: '자료구조, 알고리즘, 운영체제, 데이터베이스, 소프트웨어공학, 인공지능, 머신러닝'
  },
  {
    id: 'snu-econ',
    universityName: '서울대학교',
    departmentName: '경제학부',
    admissionType: 'comprehensive',
    minGrade: 1.0,
    maxGrade: 1.3,
    curriculum: '미시경제학, 거시경제학, 계량경제학, 경제사, 경제정책론'
  },
  {
    id: 'snu-med',
    universityName: '서울대학교',
    departmentName: '의학과',
    admissionType: 'comprehensive',
    minGrade: 1.0,
    maxGrade: 1.0,
    curriculum: '기초의학, 임상의학, 예방의학, 의료윤리, 의료정보학'
  },
  {
    id: 'snu-law',
    universityName: '서울대학교',
    departmentName: '법학과',
    admissionType: 'comprehensive',
    minGrade: 1.0,
    maxGrade: 1.2,
    curriculum: '헌법, 민법, 형법, 상법, 국제법, 법철학'
  },

  // 연세대학교 - 높은 수준 (1-2등급)
  {
    id: 'yonsei-cs',
    universityName: '연세대학교',
    departmentName: '컴퓨터과학과',
    admissionType: 'comprehensive',
    minGrade: 1.2,
    maxGrade: 2.0,
    curriculum: '프로그래밍언어론, 컴퓨터구조, 네트워크, 데이터마이닝, 컴퓨터그래픽스'
  },
  {
    id: 'yonsei-business',
    universityName: '연세대학교',
    departmentName: '경영학과',
    admissionType: 'comprehensive',
    minGrade: 1.3,
    maxGrade: 2.2,
    curriculum: '경영학원론, 회계학, 마케팅, 재무관리, 조직행동론, 전략경영'
  },
  {
    id: 'yonsei-econ',
    universityName: '연세대학교',
    departmentName: '경제학과',
    admissionType: 'subject',
    minGrade: 1.5,
    maxGrade: 2.5,
    curriculum: '경제학원론, 중급미시경제학, 중급거시경제학, 금융경제학'
  },

  // 고려대학교 - 높은 수준 (1-3등급)
  {
    id: 'korea-cs',
    universityName: '고려대학교',
    departmentName: '컴퓨터학과',
    admissionType: 'comprehensive',
    minGrade: 1.5,
    maxGrade: 2.3,
    curriculum: '객체지향프로그래밍, 시스템프로그래밍, 데이터베이스시스템, 정보보안'
  },
  {
    id: 'korea-business',
    universityName: '고려대학교',
    departmentName: '경영학과',
    admissionType: 'comprehensive',
    minGrade: 1.8,
    maxGrade: 2.8,
    curriculum: '경영통계, 경영정보시스템, 국제경영, 창업론'
  },
  {
    id: 'korea-law',
    universityName: '고려대학교',
    departmentName: '법학과',
    admissionType: 'subject',
    minGrade: 1.6,
    maxGrade: 2.5,
    curriculum: '법학개론, 행정법, 노동법, 경제법, 환경법'
  },

  // 성균관대학교 - 중상위 수준 (2-3등급)
  {
    id: 'skku-cs',
    universityName: '성균관대학교',
    departmentName: '컴퓨터공학과',
    admissionType: 'comprehensive',
    minGrade: 2.0,
    maxGrade: 3.0,
    curriculum: '모바일프로그래밍, 웹프로그래밍, 게임개발, IoT시스템'
  },
  {
    id: 'skku-business',
    universityName: '성균관대학교',
    departmentName: '경영학과',
    admissionType: 'subject',
    minGrade: 2.2,
    maxGrade: 3.2,
    curriculum: '디지털마케팅, 글로벌비즈니스, 경영분석, 기업가정신'
  },

  // 한양대학교 - 중상위 수준 (2-4등급)
  {
    id: 'hanyang-cs',
    universityName: '한양대학교',
    departmentName: '컴퓨터소프트웨어학부',
    admissionType: 'comprehensive',
    minGrade: 2.3,
    maxGrade: 3.5,
    curriculum: '소프트웨어공학, 임베디드시스템, 빅데이터처리, 클라우드컴퓨팅'
  },
  {
    id: 'hanyang-eng',
    universityName: '한양대학교',
    departmentName: '기계공학부',
    admissionType: 'subject',
    minGrade: 2.5,
    maxGrade: 3.8,
    curriculum: '기계설계, 열역학, 유체역학, 제어공학, 로봇공학'
  },

  // 중앙대학교 - 중위 수준 (3-4등급)
  {
    id: 'cau-media',
    universityName: '중앙대학교',
    departmentName: '미디어커뮤니케이션학부',
    admissionType: 'comprehensive',
    minGrade: 2.8,
    maxGrade: 4.0,
    curriculum: '방송제작, 영상편집, 광고학, 저널리즘, 디지털미디어'
  },
  {
    id: 'cau-business',
    universityName: '중앙대학교',
    departmentName: '경영학부',
    admissionType: 'subject',
    minGrade: 3.0,
    maxGrade: 4.2,
    curriculum: '경영학개론, 조직관리, 마케팅전략, 경영데이터분석'
  },

  // 경희대학교 - 중위 수준 (3-5등급)
  {
    id: 'khu-tourism',
    universityName: '경희대학교',
    departmentName: '관광학부',
    admissionType: 'comprehensive',
    minGrade: 3.2,
    maxGrade: 4.5,
    curriculum: '관광학개론, 호텔경영, 여행업경영, 관광마케팅, 국제관광'
  },
  {
    id: 'khu-cs',
    universityName: '경희대학교',
    departmentName: '컴퓨터공학과',
    admissionType: 'subject',
    minGrade: 3.0,
    maxGrade: 4.3,
    curriculum: '프로그래밍기초, 자료구조, 컴퓨터네트워크, 정보시스템'
  },

  // 서강대학교 - 중상위 수준 (2-3등급)
  {
    id: 'sogang-cs',
    universityName: '서강대학교',
    departmentName: '컴퓨터공학과',
    admissionType: 'comprehensive',
    minGrade: 2.2,
    maxGrade: 3.0,
    curriculum: '논리설계, 컴파일러, 분산시스템, 인공지능응용'
  },
  {
    id: 'sogang-econ',
    universityName: '서강대학교',
    departmentName: '경제학과',
    admissionType: 'subject',
    minGrade: 2.5,
    maxGrade: 3.3,
    curriculum: '수리경제학, 금융시장론, 산업조직론, 국제무역론'
  },

  // 홍익대학교 - 중위 수준 (3-5등급)
  {
    id: 'hongik-art',
    universityName: '홍익대학교',
    departmentName: '미술학부',
    admissionType: 'comprehensive',
    minGrade: 3.5,
    maxGrade: 5.0,
    curriculum: '드로잉, 회화, 조소, 디자인, 미술사, 현대미술론'
  },
  {
    id: 'hongik-cs',
    universityName: '홍익대학교',
    departmentName: '컴퓨터공학과',
    admissionType: 'subject',
    minGrade: 3.2,
    maxGrade: 4.5,
    curriculum: '컴퓨터프로그래밍, 웹기술, 게임프로그래밍, 멀티미디어'
  },

  // 건국대학교 - 중위 수준 (3-5등급)
  {
    id: 'konkuk-cs',
    universityName: '건국대학교',
    departmentName: '컴퓨터공학부',
    admissionType: 'comprehensive',
    minGrade: 3.3,
    maxGrade: 4.6,
    curriculum: '소프트웨어개발, 데이터베이스설계, 정보보안개론'
  },
  {
    id: 'konkuk-business',
    universityName: '건국대학교',
    departmentName: '경영학과',
    admissionType: 'subject',
    minGrade: 3.5,
    maxGrade: 4.8,
    curriculum: '기업경영, 인사관리, 생산관리, 서비스경영'
  },

  // 경기/인천 지역 대학교들
  {
    id: 'ajou-cs',
    universityName: '아주대학교',
    departmentName: '소프트웨어학과',
    admissionType: 'comprehensive',
    minGrade: 3.0,
    maxGrade: 4.2,
    curriculum: '소프트웨어공학, 모바일앱개발, 데이터사이언스'
  },
  {
    id: 'inha-cs',
    universityName: '인하대학교',
    departmentName: '컴퓨터공학과',
    admissionType: 'subject',
    minGrade: 3.2,
    maxGrade: 4.5,
    curriculum: '컴퓨터아키텍처, 운영체제, 컴퓨터네트워크'
  },

  // 지방 국립대학교들 - 중위~중하위 수준 (3-6등급)
  {
    id: 'pusan-cs',
    universityName: '부산대학교',
    departmentName: '컴퓨터공학과',
    admissionType: 'comprehensive',
    minGrade: 3.5,
    maxGrade: 5.0,
    curriculum: '프로그래밍언어, 시스템소프트웨어, 정보통신'
  },
  {
    id: 'knu-cs',
    universityName: '경북대학교',
    departmentName: '컴퓨터학부',
    admissionType: 'subject',
    minGrade: 3.8,
    maxGrade: 5.3,
    curriculum: '컴퓨터기초, 소프트웨어설계, 데이터처리'
  },
  {
    id: 'chungnam-cs',
    universityName: '충남대학교',
    departmentName: '컴퓨터공학과',
    admissionType: 'comprehensive',
    minGrade: 4.0,
    maxGrade: 5.5,
    curriculum: '프로그래밍실습, 컴퓨터시스템, 정보기술'
  },
  {
    id: 'jnu-cs',
    universityName: '전남대학교',
    departmentName: '컴퓨터정보통신공학과',
    admissionType: 'subject',
    minGrade: 4.2,
    maxGrade: 5.8,
    curriculum: '정보통신기술, 컴퓨터응용, 시스템관리'
  },

  // KAIST - 특수대학 (최상위)
  {
    id: 'kaist-cs',
    universityName: '한국과학기술원',
    departmentName: '전산학부',
    admissionType: 'comprehensive',
    minGrade: 1.0,
    maxGrade: 1.2,
    curriculum: '고급알고리즘, 컴퓨터비전, 자연언어처리, 기계학습, 양자컴퓨팅'
  }
];

/**
 * 특정 대학교의 학과 정보를 가져오는 함수
 * @param universityName 대학교 이름
 * @returns 해당 대학교의 학과 목록
 */
export function getMockDepartmentsByUniversity(universityName: string): Department[] {
  return mockAdmissionData.filter(dept => dept.universityName === universityName);
}

/**
 * 내신 성적에 따라 지원 가능한 학과를 필터링하는 함수
 * @param grade 사용자의 내신 등급
 * @param admissionType 전형 유형 ('comprehensive' | 'subject')
 * @returns 지원 가능한 학과 목록
 */
export function getMockDepartmentsByGrade(
  grade: number, 
  admissionType: 'comprehensive' | 'subject'
): Department[] {
  return mockAdmissionData.filter(dept => 
    dept.admissionType === admissionType && 
    grade >= dept.minGrade && 
    grade <= dept.maxGrade
  );
}

/**
 * 학과명으로 검색하는 함수
 * @param departmentName 검색할 학과명 (부분 검색 가능)
 * @returns 학과명이 일치하는 학과 목록
 */
export function searchMockDepartmentsByName(departmentName: string): Department[] {
  const searchTerm = departmentName.toLowerCase().trim();
  return mockAdmissionData.filter(dept => 
    dept.departmentName.toLowerCase().includes(searchTerm)
  );
}

/**
 * 내신 성적 범위에 따라 학과를 정렬하는 함수
 * @param departments 정렬할 학과 목록
 * @param sortBy 정렬 기준 ('grade' | 'name')
 * @returns 정렬된 학과 목록
 */
export function sortMockDepartments(
  departments: Department[], 
  sortBy: 'grade' | 'name'
): Department[] {
  return [...departments].sort((a, b) => {
    if (sortBy === 'grade') {
      // 성적 기준으로 정렬 (낮은 등급부터 = 성적 높은 순)
      return a.minGrade - b.minGrade;
    } else {
      // 이름 기준으로 정렬
      return a.departmentName.localeCompare(b.departmentName);
    }
  });
} 
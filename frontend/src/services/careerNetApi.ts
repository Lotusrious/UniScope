import type { CareerNetUniversity, University } from '../types';

// 커리어넷 API 기본 설정
const CAREER_NET_BASE_URL = 'https://www.career.go.kr/cnet/openapi/getOpenApi.json';
// API 키는 환경변수에서 가져옵니다 (나중에 발급받아 .env 파일에 추가해야 함)
const API_KEY = import.meta.env.VITE_CAREER_NET_API_KEY || 'demo_key';

// 커리어넷 API 응답 형태 정의
interface CareerNetResponse {
  dataSearch: {
    content: CareerNetUniversity[];
    totalCount?: number;
  };
}

/**
 * 커리어넷 API에서 대학교 목록을 가져오는 기본 함수
 * @param params API 요청 파라미터
 * @returns 대학교 정보 배열
 */
async function fetchFromCareerNet(params: Record<string, string>): Promise<CareerNetUniversity[]> {
  try {
    // URL 파라미터 생성
    const urlParams = new URLSearchParams({
      apiKey: API_KEY,
      svcType: 'api',
      svcCode: 'SCHOOL',
      contentType: 'json',
      gubun: '대학교', // 대학교만 검색
      ...params
    });

    // API 호출
    const response = await fetch(`${CAREER_NET_BASE_URL}?${urlParams}`);
    
    if (!response.ok) {
      throw new Error(`커리어넷 API 호출 실패: ${response.status}`);
    }

    const data: CareerNetResponse = await response.json();
    
    // 응답 데이터 검증
    if (!data.dataSearch || !data.dataSearch.content) {
      console.warn('커리어넷 API 응답에 데이터가 없습니다');
      return [];
    }

    return data.dataSearch.content;
  } catch (error) {
    console.error('커리어넷 API 호출 중 오류 발생:', error);
    throw new Error('대학교 정보를 가져오는 중 오류가 발생했습니다');
  }
}

/**
 * 지역별 대학교 목록을 가져오는 함수
 * @param region 지역 코드 (예: '100260' - 서울특별시)
 * @returns 해당 지역의 대학교 정보 배열
 */
export async function fetchUniversitiesByRegion(region?: string): Promise<CareerNetUniversity[]> {
  const params: Record<string, string> = {};
  
  // 지역이 지정되었을 때만 region 파라미터 추가
  if (region && region !== 'all') {
    params.region = region;
  }

  return fetchFromCareerNet(params);
}

/**
 * 대학 유형별 대학교 목록을 가져오는 함수
 * @param type '전문대학' 또는 '대학(4년제)'
 * @returns 해당 유형의 대학교 정보 배열
 */
export async function fetchUniversitiesByType(type: '전문대학' | '대학(4년제)'): Promise<CareerNetUniversity[]> {
  const params: Record<string, string> = {
    sch1: type === '전문대학' ? '100322' : '100323'
  };

  return fetchFromCareerNet(params);
}

/**
 * 대학교 이름으로 검색하는 함수
 * @param schoolName 검색할 대학교 이름 (부분 검색 가능)
 * @returns 검색된 대학교 정보 배열
 */
export async function searchUniversitiesByName(schoolName: string): Promise<CareerNetUniversity[]> {
  const params: Record<string, string> = {
    searchSchulNm: schoolName
  };

  return fetchFromCareerNet(params);
}

/**
 * 커리어넷 API 데이터를 우리 앱의 University 타입으로 변환하는 함수
 * @param careerNetData 커리어넷 API에서 받은 데이터
 * @returns 변환된 University 객체 배열
 */
export function convertToUniversityFormat(careerNetData: CareerNetUniversity[]): University[] {
  return careerNetData.map(item => ({
    id: item.seq,                    // 시퀀스를 ID로 사용
    name: item.schoolName,           // 학교명
    address: item.adres,             // 주소
    region: item.region,             // 지역
    type: item.schoolType,           // 학교유형
    estType: item.estType,           // 설립유형
    link: item.link,                 // 홈페이지 링크
    campusName: item.campusName      // 캠퍼스명
  }));
}

/**
 * 통합 대학교 검색 함수
 * 지역, 유형, 이름을 모두 고려하여 검색합니다
 * @param filters 검색 조건
 * @returns 검색된 대학교 정보 배열
 */
export async function searchUniversities(filters: {
  region?: string;
  type?: '전문대학' | '대학(4년제)';
  name?: string;
}): Promise<University[]> {
  try {
    let results: CareerNetUniversity[];

    // 검색 조건에 따른 API 호출
    if (filters.name) {
      // 이름 검색이 우선순위가 높음
      results = await searchUniversitiesByName(filters.name);
    } else if (filters.type) {
      // 유형별 검색
      results = await fetchUniversitiesByType(filters.type);
    } else {
      // 지역별 검색 (기본)
      results = await fetchUniversitiesByRegion(filters.region);
    }

    // 추가 필터링 (API에서 지원하지 않는 조건들)
    if (filters.region && filters.region !== 'all') {
      results = results.filter(item => item.region.includes(filters.region!));
    }

    if (filters.type) {
      const typeFilter = filters.type === '전문대학' ? '전문대학' : '대학(4년제)';
      results = results.filter(item => item.schoolGubun === typeFilter);
    }

    // 우리 앱의 형태로 변환하여 반환
    return convertToUniversityFormat(results);
  } catch (error) {
    console.error('대학교 검색 중 오류 발생:', error);
    throw error;
  }
}

// 지역 코드 매핑 (커리어넷 API에서 사용하는 코드)
export const REGION_CODES = {
  'all': '',
  'seoul': '100260',      // 서울특별시
  'busan': '100267',      // 부산광역시
  'incheon': '100269',    // 인천광역시
  'daegu': '100272',      // 대구광역시
  'daejeon': '100271',    // 대전광역시
  'gwangju': '100275',    // 광주광역시
  'ulsan': '100273',      // 울산광역시
  'gyeonggi': '100276',   // 경기도
  'gangwon': '100278',    // 강원도
  'chungbuk': '100280',   // 충청북도
  'chungnam': '100281',   // 충청남도
  'jeonbuk': '100282',    // 전북특별자치도
  'jeonnam': '100283',    // 전라남도
  'gyeongbuk': '100285',  // 경상북도
  'gyeongnam': '100291',  // 경상남도
  'jeju': '100292'        // 제주도
} as const; 
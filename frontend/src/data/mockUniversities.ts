import type { University } from '../types';

/**
 * 임시 대학교 데이터
 * 실제 API 연동 전까지 사용할 모의 데이터입니다.
 * 향후 커리어넷 API나 대학알리미 API로 교체 예정
 */
export const mockUniversities: University[] = [
  // 서울 지역 대학교
  {
    id: 'seoul-001',
    name: '서울대학교',
    address: '서울특별시 관악구 관악로 1',
    region: '서울특별시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.snu.ac.kr',
    campusName: '관악캠퍼스',
    logoUrl: 'https://www.snu.ac.kr/images/snu_logo.gif',
    position: { lat: 37.4601, lng: 126.9524 }
  },
  {
    id: 'seoul-002',
    name: '연세대학교',
    address: '서울특별시 서대문구 연세로 50',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.yonsei.ac.kr',
    campusName: '신촌캠퍼스',
    logoUrl: 'https://www.yonsei.ac.kr/_res/sc/_ui/desktop/images/common/emblem.png',
    position: { lat: 37.5665, lng: 126.9387 }
  },
  {
    id: 'seoul-003',
    name: '고려대학교',
    address: '서울특별시 성북구 안암로 145',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.korea.edu',
    campusName: '안암캠퍼스',
    logoUrl: 'https://www.korea.edu/sites/university/images/sub/02/img_symbol01.png',
    position: { lat: 37.5894, lng: 127.0253 }
  },
  {
    id: 'seoul-004',
    name: '성균관대학교',
    address: '서울특별시 종로구 성균관로 25-2',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.skku.edu',
    campusName: '인문사회과학캠퍼스'
  },
  {
    id: 'seoul-005',
    name: '한양대학교',
    address: '서울특별시 성동구 왕십리로 222',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.hanyang.ac.kr',
    campusName: '서울캠퍼스'
  },
  {
    id: 'seoul-006',
    name: '중앙대학교',
    address: '서울특별시 동작구 흑석로 84',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.cau.ac.kr',
    campusName: '서울캠퍼스'
  },
  {
    id: 'seoul-007',
    name: '경희대학교',
    address: '서울특별시 동대문구 경희대로 26',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.khu.ac.kr',
    campusName: '서울캠퍼스'
  },
  {
    id: 'seoul-008',
    name: '서강대학교',
    address: '서울특별시 마포구 백범로 35',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.sogang.ac.kr'
  },
  {
    id: 'seoul-009',
    name: '홍익대학교',
    address: '서울특별시 마포구 와우산로 94',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.hongik.ac.kr',
    campusName: '서울캠퍼스'
  },
  {
    id: 'seoul-010',
    name: '건국대학교',
    address: '서울특별시 광진구 능동로 120',
    region: '서울특별시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.konkuk.ac.kr',
    campusName: '서울캠퍼스'
  },

  // 경기 지역 대학교
  {
    id: 'gyeonggi-001',
    name: '성균관대학교',
    address: '경기도 수원시 장안구 서부로 2066',
    region: '경기도',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.skku.edu',
    campusName: '자연과학캠퍼스'
  },
  {
    id: 'gyeonggi-002',
    name: '한양대학교',
    address: '경기도 안산시 상록구 한양대학로 55',
    region: '경기도',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.hanyang.ac.kr',
    campusName: 'ERICA캠퍼스'
  },
  {
    id: 'gyeonggi-003',
    name: '아주대학교',
    address: '경기도 수원시 영통구 월드컵로 206',
    region: '경기도',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.ajou.ac.kr'
  },
  {
    id: 'gyeonggi-004',
    name: '인하대학교',
    address: '인천광역시 미추홀구 인하로 100',
    region: '인천광역시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.inha.ac.kr'
  },
  {
    id: 'gyeonggi-005',
    name: '단국대학교',
    address: '경기도 용인시 수지구 죽전로 152',
    region: '경기도',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.dankook.ac.kr',
    campusName: '죽전캠퍼스'
  },
  {
    id: 'gyeonggi-006',
    name: '경기대학교',
    address: '경기도 수원시 영통구 광교산로 154-42',
    region: '경기도',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.kyonggi.ac.kr',
    campusName: '수원캠퍼스'
  },
  {
    id: 'gyeonggi-007',
    name: '가천대학교',
    address: '경기도 성남시 수정구 성남대로 1342',
    region: '경기도',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.gachon.ac.kr',
    campusName: '글로벌캠퍼스'
  },

  // 부산 지역 대학교
  {
    id: 'busan-001',
    name: '부산대학교',
    address: '부산광역시 금정구 부산대학로 63번길 2',
    region: '부산광역시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.pusan.ac.kr'
  },
  {
    id: 'busan-002',
    name: '동아대학교',
    address: '부산광역시 서구 구덕로 225',
    region: '부산광역시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.donga.ac.kr',
    campusName: '승학캠퍼스'
  },
  {
    id: 'busan-003',
    name: '부경대학교',
    address: '부산광역시 남구 용소로 45',
    region: '부산광역시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.pknu.ac.kr',
    campusName: '대연캠퍼스'
  },

  // 대구 지역 대학교
  {
    id: 'daegu-001',
    name: '경북대학교',
    address: '대구광역시 북구 대학로 80',
    region: '대구광역시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.knu.ac.kr'
  },
  {
    id: 'daegu-002',
    name: '계명대학교',
    address: '대구광역시 달서구 달구벌대로 1095',
    region: '대구광역시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.kmu.ac.kr',
    campusName: '대명캠퍼스'
  },

  // 대전 지역 대학교
  {
    id: 'daejeon-001',
    name: '한국과학기술원',
    address: '대전광역시 유성구 대학로 291',
    region: '대전광역시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.kaist.ac.kr'
  },
  {
    id: 'daejeon-002',
    name: '충남대학교',
    address: '대전광역시 유성구 대학로 99',
    region: '대전광역시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.cnu.ac.kr'
  },
  {
    id: 'daejeon-003',
    name: '한밭대학교',
    address: '대전광역시 유성구 동서대로 125',
    region: '대전광역시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.hanbat.ac.kr'
  },

  // 광주 지역 대학교
  {
    id: 'gwangju-001',
    name: '전남대학교',
    address: '광주광역시 북구 용봉로 77',
    region: '광주광역시',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.jnu.ac.kr',
    campusName: '광주캠퍼스'
  },
  {
    id: 'gwangju-002',
    name: '조선대학교',
    address: '광주광역시 동구 필문대로 309',
    region: '광주광역시',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.chosun.ac.kr'
  },

  // 기타 지역 대학교
  {
    id: 'chungnam-001',
    name: '홍익대학교',
    address: '충청남도 천안시 동남구 홍익대학로 72',
    region: '충청남도',
    type: '일반대학',
    estType: '사립',
    link: 'https://www.hongik.ac.kr',
    campusName: '세종캠퍼스'
  },
  {
    id: 'gangwon-001',
    name: '강원대학교',
    address: '강원도 춘천시 강원대학길 1',
    region: '강원도',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.kangwon.ac.kr',
    campusName: '춘천캠퍼스'
  },
  {
    id: 'jeju-001',
    name: '제주대학교',
    address: '제주도 제주시 제주대학로 102',
    region: '제주도',
    type: '일반대학',
    estType: '국립',
    link: 'https://www.jejunu.ac.kr'
  }
];

/**
 * 지역별로 대학교를 필터링하는 함수
 * @param region 지역명 (예: '서울특별시', '경기도', 'all')
 * @returns 해당 지역의 대학교 목록
 */
export function getMockUniversitiesByRegion(region?: string): University[] {
  if (!region || region === 'all' || region === '전체') {
    return mockUniversities;
  }
  
  return mockUniversities.filter(university => 
    university.region.includes(region) || 
    region.includes(university.region.split(' ')[0]) // '서울' 검색 시 '서울특별시' 매칭
  );
}

/**
 * 대학 유형별로 필터링하는 함수
 * @param type 대학 유형 ('일반대학', '전문대학' 등)
 * @returns 해당 유형의 대학교 목록
 */
export function getMockUniversitiesByType(type: string): University[] {
  return mockUniversities.filter(university => 
    university.type === type
  );
}

/**
 * 설립 유형별로 필터링하는 함수
 * @param estType 설립 유형 ('국립', '사립', '공립')
 * @returns 해당 설립 유형의 대학교 목록
 */
export function getMockUniversitiesByEstType(estType: string): University[] {
  return mockUniversities.filter(university => 
    university.estType === estType
  );
}

/**
 * 대학교 이름으로 검색하는 함수
 * @param name 검색할 대학교 이름 (부분 검색 가능)
 * @returns 이름이 일치하는 대학교 목록
 */
export function searchMockUniversitiesByName(name: string): University[] {
  const searchTerm = name.toLowerCase().trim();
  return mockUniversities.filter(university => 
    university.name.toLowerCase().includes(searchTerm)
  );
} 
// Firebase Firestore에 더미 대학교/학과 데이터를 업로드하는 스크립트입니다.
// 실행 전: npm install firebase dotenv
// 실행 방법: npx ts-node frontend/scripts/addDummyData.ts
// (ts-node가 없다면 npm install -D ts-node 필요)

// ESM 환경에서 __dirname을 대체하는 코드
import { fileURLToPath } from 'url';
import path from 'path';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// frontend/.env 파일을 명시적으로 읽어옵니다
dotenv.config({ path: resolve(__dirname, '../.env') });

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';

// Firebase 설정을 환경 변수에서 읽어옵니다
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_MEASUREMENT_ID
};

// 필수 환경 변수들이 모두 설정되어 있는지 확인
const requiredEnvVars = [
  'VITE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`환경변수 ${envVar}가 비어 있습니다. .env 파일을 확인하세요.`);
  }
}

console.log('firebaseConfig:', firebaseConfig);

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 업로드할 더미 데이터 (대학교 10개, 각 대학교마다 2~3개 학과)
const universities = [
  {
    id: 'seoul-001',
    name: '서울대학교',
    region: '서울특별시',
    address: '서울특별시 관악구 관악로 1',
    type: '일반대학',
    estType: '국립',
    logoUrl: 'https://www.snu.ac.kr/images/snu_logo.gif',
    departments: [
      { id: 'cs', departmentName: '컴퓨터공학과', minGrade: 1.2, maxGrade: 2.5 },
      { id: 'ee', departmentName: '전자공학과', minGrade: 1.5, maxGrade: 2.8 },
      { id: 'me', departmentName: '기계공학과', minGrade: 1.7, maxGrade: 3.0 }
    ]
  },
  {
    id: 'yonsei-001',
    name: '연세대학교',
    region: '서울특별시',
    address: '서울특별시 서대문구 연세로 50',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.yonsei.ac.kr/_res/sc/_ui/desktop/images/common/emblem.png',
    departments: [
      { id: 'ba', departmentName: '경영학과', minGrade: 1.3, maxGrade: 2.7 },
      { id: 'psy', departmentName: '심리학과', minGrade: 1.8, maxGrade: 3.2 }
    ]
  },
  {
    id: 'korea-001',
    name: '고려대학교',
    region: '서울특별시',
    address: '서울특별시 성북구 안암로 145',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.korea.edu/sites/university/images/sub/02/img_symbol01.png',
    departments: [
      { id: 'law', departmentName: '법학과', minGrade: 1.4, maxGrade: 2.9 },
      { id: 'econ', departmentName: '경제학과', minGrade: 1.6, maxGrade: 3.1 }
    ]
  },
  {
    id: 'skku-001',
    name: '성균관대학교',
    region: '서울특별시',
    address: '서울특별시 종로구 성균관로 25-2',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.skku.edu/sites/skku/images/kor/main/img_logo.png',
    departments: [
      { id: 'chem', departmentName: '화학과', minGrade: 2.0, maxGrade: 3.5 },
      { id: 'phy', departmentName: '물리학과', minGrade: 2.2, maxGrade: 3.7 }
    ]
  },
  {
    id: 'hanyang-001',
    name: '한양대학교',
    region: '서울특별시',
    address: '서울특별시 성동구 왕십리로 222',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.hanyang.ac.kr/sites/hanyang/images/common/logo.png',
    departments: [
      { id: 'arch', departmentName: '건축학과', minGrade: 1.9, maxGrade: 3.3 },
      { id: 'bio', departmentName: '생명과학과', minGrade: 2.1, maxGrade: 3.6 }
    ]
  },
  {
    id: 'cau-001',
    name: '중앙대학교',
    region: '서울특별시',
    address: '서울특별시 동작구 흑석로 84',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.cau.ac.kr/images/cau_logo.png',
    departments: [
      { id: 'media', departmentName: '미디어커뮤니케이션학과', minGrade: 2.3, maxGrade: 3.8 },
      { id: 'pharm', departmentName: '약학과', minGrade: 1.5, maxGrade: 2.6 }
    ]
  },
  {
    id: 'khu-001',
    name: '경희대학교',
    region: '서울특별시',
    address: '서울특별시 동대문구 경희대로 26',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.khu.ac.kr/images/khu_logo.png',
    departments: [
      { id: 'hotel', departmentName: '호텔경영학과', minGrade: 2.4, maxGrade: 3.9 },
      { id: 'dent', departmentName: '치의학과', minGrade: 1.3, maxGrade: 2.2 }
    ]
  },
  {
    id: 'sogang-001',
    name: '서강대학교',
    region: '서울특별시',
    address: '서울특별시 마포구 백범로 35',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.sogang.ac.kr/sites/sogang/images/common/logo.png',
    departments: [
      { id: 'eng', departmentName: '영어영문학과', minGrade: 2.5, maxGrade: 4.0 },
      { id: 'math', departmentName: '수학과', minGrade: 2.7, maxGrade: 4.2 }
    ]
  },
  {
    id: 'hongik-001',
    name: '홍익대학교',
    region: '서울특별시',
    address: '서울특별시 마포구 와우산로 94',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.hongik.ac.kr/images/hongik_logo.png',
    departments: [
      { id: 'design', departmentName: '디자인학과', minGrade: 2.8, maxGrade: 4.5 },
      { id: 'arch2', departmentName: '건축공학과', minGrade: 2.6, maxGrade: 4.1 }
    ]
  },
  {
    id: 'konkuk-001',
    name: '건국대학교',
    region: '서울특별시',
    address: '서울특별시 광진구 능동로 120',
    type: '일반대학',
    estType: '사립',
    logoUrl: 'https://www.konkuk.ac.kr/images/ku_logo.png',
    departments: [
      { id: 'vet', departmentName: '수의예과', minGrade: 1.6, maxGrade: 2.4 },
      { id: 'food', departmentName: '식품공학과', minGrade: 2.9, maxGrade: 4.3 }
    ]
  }
];

async function uploadDummyData() {
  for (const univ of universities) {
    // 업로드 전 university 객체 출력
    console.log('업로드 시도:', univ);
    // universities 컬렉션에 각 대학교 문서 업로드
    await setDoc(doc(db, 'universities', univ.id), univ);
    console.log(`${univ.name} 업로드 완료`);
  }
  console.log('모든 더미 데이터 업로드 완료!');
}

uploadDummyData().catch(console.error); 
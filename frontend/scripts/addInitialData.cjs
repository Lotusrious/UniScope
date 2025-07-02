// frontend/scripts/addInitialData.js

// Node.js 환경에서 실행되므로, require를 사용해 모듈을 가져옵니다.
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc } = require("firebase/firestore");
const dotenv = require('dotenv');
const path = require('path');

// .env 파일의 경로를 지정하고 환경 변수를 로드합니다.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// .env 파일의 환경 변수를 사용하여 Firebase 설정을 구성합니다.
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
};

// Firebase 앱 및 Firestore를 초기화합니다.
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 테스트용 대학교 데이터
const universities = [
  { id: "seoul_univ", name: "서울대학교", address: "서울특별시 관악구 관악로 1" },
  { id: "yonsei_univ", name: "연세대학교", address: "서울특별시 서대문구 연세로 50" },
  { id: "korea_univ", name: "고려대학교", address: "서울특별시 성북구 안암로 145" },
];

// 테스트용 학과 데이터
const departments = [
  { universityName: "서울대학교", departmentName: "컴퓨터공학부", admissionType: { comprehensive: { minGrade: 1.2, maxGrade: 1.8 }, subject: { minGrade: 1.1, maxGrade: 1.5 } }, curriculum: "1학년: ... 2학년: ..." },
  { universityName: "서울대학교", departmentName: "경영학과", admissionType: { comprehensive: { minGrade: 1.5, maxGrade: 2.2 }, subject: { minGrade: 1.3, maxGrade: 1.9 } }, curriculum: "1학년: ... 2학년: ..." },
  { universityName: "연세대학교", departmentName: "컴퓨터과학과", admissionType: { comprehensive: { minGrade: 1.4, maxGrade: 2.0 }, subject: { minGrade: 1.3, maxGrade: 1.7 } }, curriculum: "1학년: ... 2학년: ..." },
  { universityName: "연세대학교", departmentName: "전기전자공학부", admissionType: { comprehensive: { minGrade: 1.6, maxGrade: 2.3 }, subject: { minGrade: 1.5, maxGrade: 2.1 } }, curriculum: "1학년: ... 2학년: ..." },
  { universityName: "고려대학교", departmentName: "컴퓨터학과", admissionType: { comprehensive: { minGrade: 1.5, maxGrade: 2.1 }, subject: { minGrade: 1.4, maxGrade: 1.8 } }, curriculum: "1학년: ... 2학년: ..." },
  { universityName: "고려대학교", departmentName: "데이터과학과", admissionType: { comprehensive: { minGrade: 1.3, maxGrade: 1.9 }, subject: { minGrade: 1.2, maxGrade: 1.6 } }, curriculum: "1학년: ... 2학년: ..." },
];

// 데이터를 Firestore에 추가하는 함수
async function addData() {
  try {
    console.log("Adding university data...");
    // for...of 루프를 사용하여 각 대학 데이터를 순차적으로 처리합니다.
    for (const uni of universities) {
      // 'universities' 컬렉션에 대학별로 문서를 생성합니다. 문서 ID를 직접 지정합니다.
      const uniRef = doc(db, "universities", uni.id);
      await setDoc(uniRef, { name: uni.name, address: uni.address });
      console.log(`Added ${uni.name}`);
    }

    console.log("\nAdding department data...");
    // for...of 루프를 사용하여 각 학과 데이터를 순차적으로 처리합니다.
    for (const dept of departments) {
      // 'departments' 컬렉션에 학과별로 문서를 생성합니다. ID는 자동 생성됩니다.
      await setDoc(doc(collection(db, "departments")), dept);
      console.log(`Added ${dept.universityName} - ${dept.departmentName}`);
    }

    console.log("\nData addition complete!");
  } catch (error) {
    console.error("Error adding data: ", error);
  }
}

// 스크립트를 실행합니다.
addData(); 
// Firebase 데이터베이스 분석 스크립트
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
require('dotenv').config();

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Universities 컬렉션 분석
 */
async function analyzeUniversities() {
  console.log('\n=== Universities 컬렉션 분석 ===');
  
  try {
    const universitiesSnapshot = await getDocs(collection(db, 'Universities'));
    
    if (universitiesSnapshot.empty) {
      console.log('Universities 컬렉션이 비어있습니다.');
      return [];
    }
    
    const universities = [];
    universitiesSnapshot.forEach((doc) => {
      const data = doc.data();
      universities.push({ id: doc.id, ...data });
      console.log(`- ${data.name} (${data.region}, ${data.estType})`);
    });
    
    console.log(`총 ${universities.length}개 대학교 등록됨`);
    return universities;
    
  } catch (error) {
    console.error('Universities 분석 실패:', error);
    return [];
  }
}

/**
 * Departments 컬렉션 분석
 */
async function analyzeDepartments() {
  console.log('\n=== Departments 컬렉션 분석 ===');
  
  try {
    const departmentsSnapshot = await getDocs(collection(db, 'Departments'));
    
    if (departmentsSnapshot.empty) {
      console.log('Departments 컬렉션이 비어있습니다.');
      return [];
    }
    
    const departments = [];
    const universityStats = {};
    
    departmentsSnapshot.forEach((doc) => {
      const data = doc.data();
      departments.push({ id: doc.id, ...data });
      
      // 대학교별 학과 수 통계
      if (!universityStats[data.universityName]) {
        universityStats[data.universityName] = 0;
      }
      universityStats[data.universityName]++;
      
      console.log(`- ${data.universityName} - ${data.departmentName}`);
      console.log(`  학생부종합: ${data.comprehensive?.minGrade || 'N/A'} ~ ${data.comprehensive?.maxGrade || 'N/A'}`);
      console.log(`  학생부교과: ${data.subject?.minGrade || 'N/A'} ~ ${data.subject?.maxGrade || 'N/A'}`);
    });
    
    console.log(`\n총 ${departments.length}개 학과 등록됨`);
    console.log('\n=== 대학교별 학과 수 통계 ===');
    Object.entries(universityStats).forEach(([university, count]) => {
      console.log(`${university}: ${count}개 학과`);
    });
    
    return departments;
    
  } catch (error) {
    console.error('Departments 분석 실패:', error);
    return [];
  }
}

/**
 * 데이터 무결성 검사
 */
async function checkDataIntegrity(universities, departments) {
  console.log('\n=== 데이터 무결성 검사 ===');
  
  const universityNames = new Set(universities.map(uni => uni.name));
  const departmentUniversities = new Set(departments.map(dept => dept.universityName));
  
  // 학과는 있는데 대학교가 없는 경우
  const orphanDepartments = [...departmentUniversities].filter(name => !universityNames.has(name));
  if (orphanDepartments.length > 0) {
    console.log('⚠️  대학교 정보가 없는 학과들:');
    orphanDepartments.forEach(name => console.log(`   - ${name}`));
  }
  
  // 대학교는 있는데 학과가 없는 경우
  const universitiesWithoutDepartments = [...universityNames].filter(name => !departmentUniversities.has(name));
  if (universitiesWithoutDepartments.length > 0) {
    console.log('⚠️  학과 정보가 없는 대학교들:');
    universitiesWithoutDepartments.forEach(name => console.log(`   - ${name}`));
  }
  
  if (orphanDepartments.length === 0 && universitiesWithoutDepartments.length === 0) {
    console.log('✅ 모든 데이터가 정상적으로 연결되어 있습니다.');
  }
}

/**
 * 메인 분석 함수
 */
async function analyzeDatabase() {
  console.log('🔍 Firebase 데이터베이스 분석을 시작합니다...');
  
  try {
    const universities = await analyzeUniversities();
    const departments = await analyzeDepartments();
    
    await checkDataIntegrity(universities, departments);
    
    console.log('\n✅ 데이터베이스 분석 완료!');
    
  } catch (error) {
    console.error('❌ 데이터베이스 분석 실패:', error);
  }
}

// 스크립트 실행
analyzeDatabase(); 
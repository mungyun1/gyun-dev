## 📝 프로젝트 소개

Gyun Dev는 저의 개인 블로그입니다. 이 프로젝트는 Next.js와 TypeScript를 활용하여 개발되었으며, Firebase를 통한 인증 시스템과 Supabase를 통한 데이터 관리를 구현하고 있습니다. 또한 마크다운 에디터를 지원하여 콘텐츠 작성이 용이하며, 다크 모드를 지원합니다.

## 🛠 기술 스택

### 🎨 Frontend

- **Framework**: Next.js 15.1.8
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand, TanStack Query (React Query)

### 💾 Backend & Database

- **Framework**: Next.js 15.1.8 (API Routes)
- **Language**: SQL
- **Authentication**: Firebase Auth
- **Database**: Supabase

### 📚 기타 라이브러리

- **마크다운 지원**
  - @uiw/react-md-editor
  - rehype-autolink-headings
  - rehype-slug
  - remark-breaks
  - remark-gfm

### 🔧 개발 도구

- ESLint
- TypeScript
- Tailwind CSS

### ✨ 특징

- 다크 모드 지원 (next-themes)
- TypeScript 기반 타입 안정성
- 반응형 디자인
- 마크다운 에디터 내장
- 실시간 데이터 동기화

## 🏃‍♂️ 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 📂 프로젝트 구조

```
src/
├── app/         # 페이지 및 라우팅
├── components/  # 재사용 가능한 컴포넌트
├── lib/         # 유틸리티 및 설정
├── store/       # 상태 관리
├── utils/       # 유틸리티 함수
└── contexts/    # React Context
```

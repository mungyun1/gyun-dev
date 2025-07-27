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

- **SEO 최적화**
  - next-seo
  - JSON-LD 구조화 데이터
  - 자동 sitemap 생성
  - robots.txt

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
- SEO 최적화 (메타 태그, Open Graph, Twitter Cards)
- 구조화 데이터 (JSON-LD)
- 자동 sitemap 및 robots.txt 생성

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
│   ├── seo.ts   # SEO 설정
│   ├── schema.ts # JSON-LD 스키마
│   └── sitemap.ts # Sitemap 생성
└── contexts/    # React Context
```

## 🔍 SEO 최적화

이 프로젝트는 다음과 같은 SEO 최적화 기능을 제공합니다:

### 메타 태그 및 Open Graph

- `next-seo` 라이브러리를 사용한 동적 메타 태그 관리
- Open Graph 및 Twitter Cards 지원
- 각 페이지별 최적화된 제목과 설명

### 구조화 데이터 (JSON-LD)

- 블로그 포스트용 `BlogPosting` 스키마
- 웹사이트용 `WebSite` 스키마
- About 페이지용 `Person` 스키마

### 자동 생성 파일

- `/sitemap.xml` - 모든 페이지의 자동 sitemap 생성
- `/robots.txt` - 검색 엔진 크롤링 규칙

### 환경 변수

- `NEXT_PUBLIC_APP_URL` - 사이트의 기본 URL 설정

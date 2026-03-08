# 사주 궁합 웹서비스 MVP (1차 뼈대)

## 프로젝트 개요
사주 기반 궁합 서비스를 위한 Next.js App Router 프로젝트의 1차 MVP 뼈대입니다.
현재 단계에서는 기능 완성보다 **실행 가능한 기본 구조와 필수 라우트 정리**를 목표로 합니다.

## 현재 단계 범위
- 필수 페이지 라우트 생성 및 placeholder 정리
- 공통 레이아웃/카드 컴포넌트 기반 최소 UI 정리
- 정책/안내 페이지 초안 구성
- 문서(제품 스펙/UX 플로우) 초안 작성

제외 범위:
- 실제 사주 계산 로직
- 데이터베이스 연동
- 공유 기능 완성(room/join)
- 고도화된 디자인 및 카피

## 실행 방법
```bash
npm install
npm run dev
```

빌드 확인:
```bash
npm run build
npm run start
```

## 라우트 목록
- `/` : 홈
- `/match` : 입력 화면 placeholder
- `/result/[id]` : 결과 화면 placeholder
- `/policy/privacy` : 개인정보 처리방침 초안
- `/policy/notice` : 서비스 안내 초안
- `/room` : room 기능 준비중
- `/join/[roomCode]` : room 참여 기능 준비중

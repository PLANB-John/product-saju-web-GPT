# 사주 궁합 웹서비스 MVP

## 프로젝트 개요
사주 기반 궁합 서비스를 위한 Next.js App Router 프로젝트입니다.
현재는 **1차 뼈대 구조를 유지하면서 2단계 입력 폼/검증/결과 연결 흐름**까지 반영한 상태입니다.

## 현재 단계 범위
- 필수 페이지 라우트 및 공통 레이아웃 유지
- `/match` 입력 폼(이름/생년월일/출생시간, 시간 미상 처리)
- 입력값 기본 validation 후 `/result/[id]`로 이동
- 결과 화면에서 mock 데이터 표시 + 입력자 이름 확인
- 문서(제품 스펙/UX 플로우) 최신화

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
- `/match` : 입력 폼 + validation
- `/result/[id]` : 결과 화면(mock)
- `/policy/privacy` : 개인정보 처리방침 초안
- `/policy/notice` : 서비스 안내 초안
- `/room` : room 기능 준비중
- `/join/[roomCode]` : room 참여 기능 준비중

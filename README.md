# 사주 궁합 웹서비스 MVP

## 프로젝트 개요
사주 기반 궁합 서비스를 위한 Next.js App Router 프로젝트입니다.
현재는 **입력 → 결과 흐름을 유지하면서 결과 저장/재방문/공유가 가능한 4단계**까지 반영한 상태입니다.

## 현재 단계 범위
- 필수 페이지 라우트 및 공통 레이아웃 유지
- `/match` 입력 폼(이름/생년월일/출생시간, 시간 미상 처리)
- 입력값 기본 validation 후 새 결과 생성 및 저장
- `/result/[id]` 결과 화면 구조화 + 저장된 결과 재조회
  - 상단 요약(이름, 점수, 관계 유형, 한 줄 요약)
  - 핵심 해석/잘 맞는 점/조율 포인트/관계 유지 팁/안내 섹션
  - 공유하기/링크 복사 UX
- localStorage 기반 lightweight 저장소 도입(향후 Supabase 교체 대비)
- deterministic mock 결과 생성 구조 유지(향후 실제 엔진 교체 대비)
- 문서(제품 스펙/UX 플로우) 최신화

제외 범위:
- 실제 사주 계산 로직
- 로그인/회원가입
- 결제
- room/join 본격 구현
- 과도한 백엔드 구조

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
- `/match` : 입력 폼 + validation + 결과 생성/저장
- `/result/[id]` : 저장된 결과 조회/공유
- `/policy/privacy` : 개인정보 처리방침 초안
- `/policy/notice` : 서비스 안내 초안
- `/room` : room 기능 준비중
- `/join/[roomCode]` : room 참여 기능 준비중

## 현재 사용자 흐름
1. `/match`에서 두 사람 정보를 입력하고 제출한다.
2. 클라이언트에서 deterministic mock 결과를 생성하고 localStorage에 저장한다.
3. 저장 완료 후 `/result/[id]`로 이동한다.
4. 같은 브라우저에서 새로고침하거나 링크를 다시 열어도 같은 결과를 확인한다.
5. 결과 페이지에서 공유하기/링크 복사로 URL을 전달할 수 있다.

## 배포 주의사항
- Vercel 배포 시 Next.js 설정 파일은 `next.config.ts`를 지원하지 않습니다.
- 설정 파일은 `next.config.mjs`(또는 `next.config.js`) 형식을 사용하세요.

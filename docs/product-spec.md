# Product Spec (MVP 5차 반영)

## 1) 서비스 목표
- 사주 기반 궁합 서비스의 핵심 사용자 여정(홈 → 입력 → 결과)을 검증한다.
- 결과가 일회성으로 사라지지 않도록 저장/재방문/공유의 기본 사용자 경험을 완성한다.

## 2) 이번 단계 범위
- `/match` 제출 시 새 결과를 생성하고 저장한 뒤 `/result/[id]`로 이동
- `/result/[id]`를 result id 기준으로 동작하도록 변경
  - 저장된 결과가 있으면 정상 렌더링
  - 결과가 없으면 자연스러운 empty state + `/match` 이동 CTA 제공
- 결과 공유 UX 추가
  - Web Share API 지원 시 네이티브 공유 우선
  - 미지원/실패 시 링크 복사 fallback
  - 복사 성공/실패 피드백 노출
- 저장소 구조 분리
  - `lib/storage/result-repository.ts`에 create/get/list 인터페이스 구성
  - 현재는 localStorage 구현 사용
  - 추후 Supabase repository로 교체 가능한 형태 유지

## 3) 제외 범위
- 실제 사주 계산 엔진 연결
- 로그인/회원가입
- 결제
- room/join 본격 구현
- 대규모 백엔드 아키텍처 도입

## 4) 데이터 저장 전략 (현재)
- 저장 위치: 브라우저 localStorage
- 키 전략: `resultId` 기반 조회
- 저장 단위: 결과 전체(요약/섹션/안내 + createdAt)
- 장점: 구현 단순, 빠른 MVP 검증 가능
- 한계: 기기/브라우저 간 동기화 불가(향후 Supabase로 확장)

## 5) 다음 단계에서 할 일
- repository 인터페이스를 유지한 채 Supabase 구현체 추가
- 생성/조회 API 경계 정리(서버 연동 대비)
- 결과 재방문 목록(최근 결과) UX 확장
- room/join 공유 플로우 설계 연계

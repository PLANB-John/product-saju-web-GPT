# 시각 언어 가이드 (컬러 시스템)

## 1) 관계도감 전용 팔레트
- page background: `#FCF8F7`
- soft surface: `#F1EBE7`
- card surface: `#FFFFFF`
- border: `#E5E0DC`
- primary text: `#1F1C1A`
- secondary text: `#5F5A56`
- muted text: `#8A847E`
- primary accent: `#8F6F63` (로즈 브라운)
- secondary accent: `#7D8574` (세이지 그레이)
- deep accent: `#4E433E` (웜 코코아)
- primary button: `#2F2926`
- button text: `#FFFFFF`

## 2) 적용 역할
- 배경(`page`, `soft`)은 레이어 구분에만 사용한다.
- 카드(`card surface`)는 본문 정보 컨테이너에만 사용한다.
- 텍스트는 무채색 3단계(`primary/secondary/muted`)만 사용한다.
- accent는 배지, 섹션 헤더, 얇은 구분선, 요약 카드 강조, 숫자 마커에만 제한 사용한다.
- 결과 화면의 강점/조율/팁 섹션은 색으로 분리하지 않고 구조와 타이포로 구분한다.

## 3) 이번 정비에서 제거/축소한 인상
- 기존 `#F6E8EC` 단일 핑크톤 중심 강조를 축소하고, 웜 뉴트럴 + 세이지 계열로 재정비했다.
- 본문 전역의 직접 색 지정(검정/회색 하드코딩)을 줄이고 토큰 기반 사용으로 통일했다.
- 강조 색의 사용 범위를 CTA 주변/요약 포인트로 제한해 과한 다채색 인상을 방지했다.

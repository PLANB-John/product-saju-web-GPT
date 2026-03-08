# 시각 언어 가이드 (컬러 시스템)

## 1) 관계도감 전용 팔레트
- page background: `#FCF8F7`
- soft surface: `#F4EDE9`
- card surface: `#FFFFFF`
- border: `#E7DFDA`
- primary text: `#181614`
- secondary text: `#5F5954`
- muted text: `#918983`
- primary accent: `#9A7667` (로즈 브라운)
- secondary accent: `#808A7D` (세이지 그레이)
- deep accent: `#4B403A` (웜 코코아)
- primary button: `#2C2623`
- button text: `#FFFFFF`

## 2) 적용 역할
- 배경(`page`, `soft`)은 레이어 구분에만 사용한다.
- 카드(`card surface`)는 본문 정보 컨테이너에만 사용한다.
- 텍스트는 무채색 3단계(`primary/secondary/muted`)만 사용한다.
- accent는 배지, 섹션 헤더, 얇은 구분선, 요약 카드 강조, 숫자 마커에만 제한 사용한다.
- 결과 화면의 강점/조율/팁 섹션은 색으로 분리하지 않고 구조와 타이포로 구분한다.

## 3) 이번 정비에서 조정한 포인트
- 홈 hero와 결과 요약 카드에서만 accent 농도를 소폭 올려 첫인상 밀도를 보강했다.
- /match 화면은 두 사람 카드 배경 분리를 줄이고 라벨/보더 강조로만 차이를 두어 차분함을 유지했다.
- 하드코딩된 `text-black` 사용을 줄이고 토큰(`--text-primary`) 중심으로 통일했다.

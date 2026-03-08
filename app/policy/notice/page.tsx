export default function NoticePage() {
  return (
    <article className="space-y-4">
      <h1 className="text-2xl font-bold">서비스 안내 (초안)</h1>
      <section className="space-y-1">
        <h2 className="font-semibold">1. 현재 제공 범위</h2>
        <p className="text-sm text-slate-700">
          현재는 프로젝트 구조와 주요 화면 골격을 확인하는 MVP 1차 단계입니다.
        </p>
      </section>
      <section className="space-y-1">
        <h2 className="font-semibold">2. 결과 해석 안내</h2>
        <p className="text-sm text-slate-700">
          표시되는 결과 문구는 임시 예시이며, 실제 로직과 문구는 이후 단계에서 정교화됩니다.
        </p>
      </section>
      <section className="space-y-1">
        <h2 className="font-semibold">3. 준비중 기능</h2>
        <p className="text-sm text-slate-700">
          room/join 기반 공동 확인 기능은 현재 준비중이며 향후 업데이트 예정입니다.
        </p>
      </section>
    </article>
  );
}

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="card">
        <h1>사주 궁합 MVP</h1>
        <p>2단계: 입력 폼/기본 결과 흐름</p>
        <Link href="/match">궁합 입력 시작하기</Link>
      </section>
    </main>
  );
}

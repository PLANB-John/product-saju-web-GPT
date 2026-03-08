import Link from "next/link";
import { decodeMatchInput } from "@/lib/compatibility/transport";
import { generateMockCompatibility } from "@/lib/compatibility/mock-result";

type Props = {
  params: { id: string };
  searchParams: { payload?: string };
};

export default function ResultPage({ params, searchParams }: Props) {
  const input = decodeMatchInput(searchParams.payload);

  if (!input) {
    return (
      <main className="container">
        <section className="card">
          <h1>결과를 불러올 수 없어요</h1>
          <p>입력 정보가 없거나 형식이 올바르지 않습니다.</p>
          <Link href="/match">입력 페이지로 돌아가기</Link>
        </section>
      </main>
    );
  }

  const result = generateMockCompatibility(input);

  return (
    <main className="container">
      <section className="card">
        <h1>{result.people.person1Name} · {result.people.person2Name}</h1>
        <p>결과 ID: {params.id}</p>
      </section>

      <section className="card">
        <h2>궁합 점수</h2>
        <p style={{ fontSize: 28, fontWeight: 700 }}>{result.score}점</p>
      </section>

      <section className="card">
        <h2>관계 유형</h2>
        <p>{result.relationshipType}</p>
      </section>

      <section className="card">
        <h2>핵심 해석</h2>
        <ul>
          {result.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <Link href="/match">다시 입력하기</Link>
      </section>
    </main>
  );
}

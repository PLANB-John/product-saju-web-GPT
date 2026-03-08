import { ResultPageClient } from "@/components/result/result-page-client";

export default function ResultPage({
  params,
}: {
  params: { id: string };
}) {
  return <ResultPageClient resultId={params.id} />;
}

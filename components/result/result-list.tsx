type ResultListProps = {
  items: readonly string[];
};

export function ResultList({ items }: ResultListProps) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

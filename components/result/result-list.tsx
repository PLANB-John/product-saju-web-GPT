type ResultListProps = {
  items: readonly string[];
};

export function ResultList({ items }: ResultListProps) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

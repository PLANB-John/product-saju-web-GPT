type ResultListProps = {
  items: readonly string[];
};

export function ResultList({ items }: ResultListProps) {
  return (
    <ul className="space-y-2 text-sm leading-7 text-slate-700 sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

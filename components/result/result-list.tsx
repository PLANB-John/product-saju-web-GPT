type ResultListProps = {
  items: readonly string[];
};

export function ResultList({ items }: ResultListProps) {
  return (
    <ul className="space-y-2.5 sm:space-y-3">
      {items.map((item, index) => (
        <li key={item} className="rounded-2xl border border-slate-100 bg-white px-3.5 py-3 text-sm leading-7 text-slate-700 sm:px-4 sm:text-base">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
              {index + 1}
            </span>
            <span className="min-w-0 break-words">{item}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

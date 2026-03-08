type ResultListProps = {
  items: readonly string[];
};

export function ResultList({ items }: ResultListProps) {
  return (
    <ul className="space-y-2.5 sm:space-y-3">
      {items.map((item, index) => (
        <li key={item} className="rounded-2xl border border-[#E9E9E9] bg-white px-3.5 py-3 text-sm leading-7 text-black sm:px-4 sm:text-base">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F6E8EC] text-[11px] font-semibold text-black">
              {index + 1}
            </span>
            <span className="min-w-0 break-words">{item}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

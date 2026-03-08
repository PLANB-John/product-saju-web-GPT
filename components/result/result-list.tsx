type ResultListProps = {
  items: readonly string[];
};

export function ResultList({ items }: ResultListProps) {
  return (
    <ul className="space-y-2.5 sm:space-y-3">
      {items.map((item, index) => (
        <li
          key={item}
          className="rounded-2xl border bg-white px-3.5 py-3 text-sm leading-7 sm:px-4 sm:text-base"
          style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
        >
          <div className="flex items-start gap-3">
            <span
              className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
              style={{ backgroundColor: "color-mix(in srgb, var(--accent-secondary) 14%, white)", color: "var(--accent-deep)" }}
            >
              {index + 1}
            </span>
            <span className="min-w-0 break-words">{item}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

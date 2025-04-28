export default function SkeletonTable({
  cols = 4,
  rows = 5
}: {
  cols?: number;
  rows?: number;
}) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex space-x-2">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-5 flex-1 rounded bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

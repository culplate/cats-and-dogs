export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg overflow-hidden shadow bg-gray-100">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

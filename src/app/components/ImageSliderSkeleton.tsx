export default function ImageSliderSkeleton() {
  return (
    <div className="relative">
      <div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>
      <div className="mt-4 flex space-x-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse h-16 w-16 bg-gray-200 rounded-lg flex-shrink-0"
          ></div>
        ))}
      </div>
    </div>
  );
}

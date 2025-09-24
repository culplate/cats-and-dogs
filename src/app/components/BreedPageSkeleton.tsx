export default function BreedPageSkeleton() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="animate-pulse mb-6">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="animate-pulse h-96 bg-gray-200 relative">
          <div className="absolute top-4 right-4">
            <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="p-6">
          <div className="animate-pulse">
            <div className="w-64 h-8 bg-gray-200 rounded mb-4"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-40 h-4 bg-gray-200 rounded"></div>
              </div>

              <div className="space-y-4">
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-28 h-4 bg-gray-200 rounded"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="animate-pulse">
            <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import BackButton from "@/app/components/ui/BackButton";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Breed Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn't find the breed you're looking for. It may have been
          removed or the link might be incorrect.
        </p>

        <BackButton />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: Array<{
    id: string;
    url: string;
    width?: number;
    height?: number;
  }>;
}

export default function ImageSlider({ images }: ImageSliderProps) {
  // Limit to maximum 10 images
  const limitedImages = images.slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % limitedImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + limitedImages.length) % limitedImages.length
    );
  };

  if (limitedImages.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  if (limitedImages.length === 1) {
    return (
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={limitedImages[0].url}
          alt="Breed image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={limitedImages[currentIndex].url}
          alt={`Breed image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-contain transition-opacity duration-300"
          priority={currentIndex === 0}
        />

        {/* Navigation Arrows */}
        {limitedImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {limitedImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {limitedImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {limitedImages.length > 1 && (
        <div className="mt-2 pt-2 flex space-x-2 overflow-x-auto pb-2">
          {limitedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 cursor-pointer ${
                index === currentIndex
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : "hover:opacity-75"
              }`}
            >
              <Image
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

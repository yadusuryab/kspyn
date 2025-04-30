"use client";

import React, { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import slide1 from "@/public/1.jpg";
import slide2 from "@/public/2.jpg";
import slide3 from "@/public/3.jpg";

const slides = [
  {
    image: slide1,
    title: "Design That Speaks",
    subtitle: "Purposeful Experiences",
  },
  {
    image: slide2,
    title: "Inspired by Origins",
    subtitle: "Cultural Roots",
  },
  {
    image: slide3,
    title: "Designed with Depth",
    subtitle: "Immersive Flow",
  },
];

export  function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Carousel */}
      <div className="h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              className="flex-shrink-0 w-full h-full relative"
              key={index}
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="absolute bottom-20 left-10 text-white z-10">
              <p className="text-lg md:text-2xl drop-shadow-md">
                  {slide.subtitle}
                </p>
                <h2 className="text-4xl md:text-6xl tracking-tighter font-semibold mb-2 drop-shadow-lg">
                  {slide.title}
                </h2>
               
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-5 left-10 right-10 flex space-x-4 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            className="h-1 w-full bg-white/30 overflow-hidden rounded"
          >
            <div
              ref={(el:any) => (progressRefs.current[index] = el)}
              className={`h-full bg-white transition-all duration-[5000ms] ${
                index === selectedIndex ? "w-full" : "w-0"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

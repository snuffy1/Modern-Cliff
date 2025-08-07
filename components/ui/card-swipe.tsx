"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
  slideShadows: boolean;
}

export const CardSwipe: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  slideShadows = false,
}) => {
  const css = `
  .swiper {
    width: 100%;
    height: 100vh;
    padding-bottom: 50px;
  }
  
  .swiper-slide {
   display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 18px;
    quality: 100;
  }
  
  `;
  return (
    <section className="w-ace-y-4 overflow-hidden">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-4xl rounded-[24px] border border-black/5 p-2 shadow-sm md:rounded-t-[44px]">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-neutral-800/5 p-2 shadow-sm md:items-start md:gap-8 md:rounded-b-[20px] md:rounded-t-[40px] md:p-2">
          {/* <Badge
            variant="outline"
            className="absolute left-4 top-6 rounded-[14px] border border-black/10 text-base md:left-6"
          >
            <SparklesIcon className="fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
            Latest component
          </Badge> */}
          <div className="flex flex-col justify-center pb-2 pl-4 w-full pt-14 md:items-center">
            <div className="flex gap-2">
              <div>
                <h3 className="text-4xl opacity-85 text-center font-bold tracking-tight">
                  Cliff Swipe
                </h3>
                <p className="flex items-center gap-1">
                  Swipe images right and left for experience.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"cards"}
                grabCursor={true}
                loop={true}
                slidesPerView={"auto"}
                rewind={true}
                cardsEffect={{
                  slideShadows: slideShadows,
                }}
                modules={[EffectCards, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full relative rounded-3xl">
                      <Image
                        src={image.src}
                        width={500}
                        height={500}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                      <h1 className="text-4xl text-center z-30 absoulute ">
                        {image.alt}
                      </h1>
                    </div>
                  </SwiperSlide>
                ))}
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={200}
                        height={200}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                      {/* <h1 className="text-4xl absolute top-4 left-4 z-50 ">
                        {image.alt}
                      </h1> */}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

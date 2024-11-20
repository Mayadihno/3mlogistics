"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { carouselData } from "@/utils/data";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className="relative z-0">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {Array.isArray(carouselData) &&
          carouselData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full md:h-[560px] h-[400px]">
                <Image
                  src={item.image.src}
                  alt={`carousel image ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={560}
                />
                <div className="absolute inset-0 bg-black opacity-40" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-1 md:px-4">
                  <h3 className="md:text-6xl text-4xl font-bold font-urbanist">
                    Welcome to 3M Food & logistics Solution
                  </h3>
                  <h3 className="md:text-4xl text-xl font-semibold pt-5 font-prociono">
                    Where Goods are deliverd at your doorstep
                  </h3>
                  <h5 className="text-2xl pt-5 font-urbanist">{item.text}</h5>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

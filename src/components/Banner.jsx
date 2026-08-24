"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="relative w-full h-[400px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide>
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <p>Slide 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <p>Slide 2</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-gray-300 w-full h-full flex items-center justify-center">
            <p>Slide 3</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;


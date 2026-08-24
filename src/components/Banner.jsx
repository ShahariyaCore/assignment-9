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
    <section className="relative h-[80vh] w-full overflow-hidden rounded-xl shadow-2xl">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className="h-full w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full w-full flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/image/cover.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-4xl">
              <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                Book Your Appointment Easily 🩺
              </h1>
              <p className="text-lg mb-8 text-gray-200">
                Manage your health with just a few clicks.
              </p>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 text-white px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform text-lg font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full w-full flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/image/cover2.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-4xl">
              <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                Trusted Doctors, Anytime 👨‍⚕️👩‍⚕️
              </h1>
              <p className="text-lg mb-8 text-gray-200">
                Connect with certified medical professionals.
              </p>
              <Link href="/all-appointments">
                <Button className="bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 text-white px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform text-lg font-semibold">
                  View Appointments
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full w-full flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/image/cover3.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-4xl">
              <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                Your Health Records, Secured 🔒
              </h1>
              <p className="text-lg mb-8 text-gray-200">
                Access and manage your medical history safely.
              </p>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 text-white px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform text-lg font-semibold">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="h-full w-full flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/image/cover4.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="relative z-10 text-center text-white px-6 max-w-4xl">
              <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                Affordable Care for Everyone 💙
              </h1>
              <p className="text-lg mb-8 text-gray-200">
                Transparent pricing and accessible healthcare.
              </p>
              <Link href="/pricing">
                <Button className="bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 text-white px-8 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform text-lg font-semibold">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;



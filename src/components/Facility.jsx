"use client";
import Image from "next/image";
import Link from "next/link";

const Facility = () => {
  const facilities = [
    {
      img: "/Facility/facility1.jpg",
      title: "Modern Hospital",
      desc: "Equipped with advanced technology for accurate diagnosis and treatment.",
      link: "/facility/modern-hospital",
    },
    {
      img: "/Facility/facility2.jpg",
      title: "Emergency Care",
      desc: "24/7 emergency services with dedicated medical staff.",
      link: "/facility/emergency-care",
    },
    {
      img: "/Facility/facility3.jpg",
      title: "Specialist Doctors",
      desc: "Experienced professionals across multiple medical fields.",
      link: "/facility/specialist-doctors",
    },
    {
      img: "/Facility/facility4.jpg",
      title: "Pharmacy Support",
      desc: "On-site pharmacy with essential medicines and guidance.",
      link: "/facility/pharmacy",
    },
    {
      img: "/Facility/facility5.jpg",
      title: "Diagnostic Labs",
      desc: "Accurate lab tests with modern equipment.",
      link: "/facility/labs",
    },
    {
      img: "/Facility/facility6.jpg",
      title: "Ambulance Service",
      desc: "Quick response ambulance service for emergencies.",
      link: "/facility/ambulance",
    },
    {
      img: "/Facility/facility7.jpg",
      title: "Patient Rooms",
      desc: "Comfortable and hygienic rooms for admitted patients.",
      link: "/facility/patient-rooms",
    },
    {
      img: "/Facility/facility8.jpg",
      title: "Telemedicine",
      desc: "Consult doctors online from anywhere, anytime.",
      link: "/facility/telemedicine",
    },
  ];

  return (
    <section className="py-20 bg-[#d0defd5a] rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-600 mb-12">Our Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <Image
                src={facility.img}
                alt={facility.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{facility.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{facility.desc}</p>
                <Link
                  href={facility.link}
                  className="inline-block mt-auto px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facility;

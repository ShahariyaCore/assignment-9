"use client";
import Image from "next/image";

const Achievements = () => {
  const images = [
    "/achieve/achieve1.jpg",
    "/achieve/achieve2.jpg",
    "/achieve/achieve3.jpg",
    "/achieve/achieve4.jpg",
    "/achieve/achieve5.jpg",
    "/achieve/achieve6.jpg",
    "/achieve/achieve7.jpg",
    "/achieve/achieve8.jpg",
    "/achieve/achieve9.jpg",
    "/achieve/achieve10.jpg",
    "/achieve/achieve11.jpg",
    "/achieve/achieve12.jpg",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-purple-600 mb-12">Our Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={img}
                alt={`Achievement ${index + 1}`}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

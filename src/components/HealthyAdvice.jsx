"use client";
import Image from "next/image";
import Link from "next/link";

const HealthyAdvice = () => {
  const advices = [
    {
      img: "/advice/advice1.jpg",
      title: "Balanced Nutrition",
      desc: "Eat a variety of fruits, vegetables, and whole grains daily.",
      link: "/advice/nutrition",
    },
    {
      img: "/advice/advice2.jpg",
      title: "Regular Exercise",
      desc: "Stay active with at least 30 minutes of exercise each day.",
      link: "/advice/exercise",
    },
    {
      img: "/advice/advice3.jpg",
      title: "Mental Wellness",
      desc: "Practice mindfulness and ensure proper sleep for mental health.",
      link: "/advice/mental-wellness",
    },
    {
      img: "/advice/advice4.jpg",
      title: "Hydration",
      desc: "Drink enough water throughout the day to stay energized.",
      link: "/advice/hydration",
    },
    {
      img: "/advice/advice5.jpg",
      title: "Preventive Checkups",
      desc: "Schedule regular health checkups to catch issues early.",
      link: "/advice/checkups",
    },
    {
      img: "/advice/advice6.jpg",
      title: "Healthy Sleep",
      desc: "Aim for 7–8 hours of quality sleep every night.",
      link: "/advice/sleep",
    },
    {
      img: "/advice/advice7.jpg",
      title: "Stress Management",
      desc: "Reduce stress with relaxation techniques and hobbies.",
      link: "/advice/stress",
    },
    {
      img: "/advice/advice8.jpg",
      title: "Limit Processed Foods",
      desc: "Choose fresh, whole foods over processed alternatives.",
      link: "/advice/processed-foods",
    },
  ];

  return (
    <section className="py-20 bg-[#d0e6fdad] rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-12">Healthy Advice</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {advices.map((advice, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <Image
                src={advice.img}
                alt={advice.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{advice.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{advice.desc}</p>
                <Link
                  href={advice.link}
                  className="inline-block mt-auto px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
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

export default HealthyAdvice;

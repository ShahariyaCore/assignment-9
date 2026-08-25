import Link from "next/link";
import doctors from "../../public/doctors.json"; // your updated doctor dataset

const TopDoctors = () => {
  // Take the first 3 doctors (or sort by experience/fee if you prefer)
  const topDoctors = doctors.slice(0, 3);

  return (
    <div className="top-doctors w-max mx-auto py-16">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 drop-shadow-lg">
        🩺 Top Doctors
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {topDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 w-[350px]"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 text-left">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-green-600 transition">
                {doctor.name}
              </h3>
              <p className="text-gray-600 mb-2">{doctor.specialty}</p>
              <p className="text-gray-500 mb-2">🏥 {doctor.hospital}</p>
              <p className="text-blue-500 font-semibold mb-4">
                💰 Fee: {doctor.fee} BDT
              </p>

              <Link
                href={`/doctors/${doctor.id}`}
                className="inline-block bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform font-semibold"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllAppointments() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  // Fetch doctors from your API
  useEffect(() => {
    fetch("https://assignment-9-psi-two.vercel.app/doctors.json")
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  // Handle navigation based on auth state
  const handleViewDetails = (id) => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push(`/doctors/${id}`);
    } else {
      router.push("/signin");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Appointments</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map(doc => (
          <div key={doc.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform">
            <img src={doc.image} alt={doc.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{doc.name}</h2>
              <p className="text-gray-600">{doc.specialty}</p>
              <p className="text-sm text-gray-500">Experience: {doc.experience}</p>
              <p className="text-sm text-gray-500">Hospital: {doc.hospital}</p>
              <p className="text-sm text-gray-500">Fee: {doc.fee} BDT</p>
              <button
                onClick={() => handleViewDetails(doc.id)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

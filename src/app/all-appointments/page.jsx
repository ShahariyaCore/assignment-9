"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllAppointments() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/doctors.json")
      .then(res => {
        if (!res.ok) throw new Error("Unable to load doctors");
        return res.json();
      })
      .then(data => setDoctors(data))
      .catch(err => console.error(err));
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/doctors/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Appointments</h1>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors available at the moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map(doc => (
            <div
              key={doc.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-48 object-cover"
              />
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
      )}
    </div>
  );
}

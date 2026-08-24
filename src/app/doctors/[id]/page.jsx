"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DoctorDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/doctors.json")
      .then(res => {
        if (!res.ok) throw new Error("Unable to load doctor details");
        return res.json();
      })
      .then(data => {
        const found = data.find(d => d.id === id);
        if (!found) throw new Error("Doctor not found");
        setDoctor(found);
      })
      .catch(() => setError("Doctor details could not be loaded."));
  }, [id]);

  if (error) return <p className="p-8 text-center text-red-600">{error}</p>;
  if (!doctor) return <p className="p-8 text-center">Loading doctor details...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-48 h-48 object-cover rounded-full mb-6"
        />
        <h1 className="text-3xl font-bold">{doctor.name}</h1>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="mt-2 text-sm text-gray-500">Experience: {doctor.experience}</p>
        <p className="mt-2">{doctor.description}</p>
        <p className="mt-2 text-sm text-gray-500">Hospital: {doctor.hospital}</p>
        <p className="text-sm text-gray-500">Location: {doctor.location}</p>
        <p className="text-sm text-gray-500">Fee: {doctor.fee} BDT</p>
        <p className="mt-2 text-sm text-gray-500">
          Availability: {doctor.availability.join(" | ")}
        </p>

        <button
          onClick={() => router.push(`/book/${doctor.id}`)}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

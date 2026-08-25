"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AllAppointments() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch("/doctors.json")
      .then(res => {
        if (!res.ok) throw new Error("Unable to load doctors");
        return res.json();
      })
      .then(data => {
        setDoctors(data);
        setFilteredDoctors(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/doctors/${id}`);
  };

  const handleSearch = () => {
    const results = doctors.filter(doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(results);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Appointments</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Doctor Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-l-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors available at the moment.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map(doc => (
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

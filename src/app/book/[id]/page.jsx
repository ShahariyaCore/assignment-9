"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ patientName: "", gender: "", phone: "", appointmentDate: "", appointmentTime: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace(`/signin?callbackUrl=${encodeURIComponent(`/book/${id}`)}`);
  }, [id, router, status]);

  useEffect(() => {
    fetch("/doctors.json").then(response => response.json()).then(doctors => setDoctor(doctors.find(item => item.id === id))).catch(() => setError("Doctor details could not be loaded."));
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    const response = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, doctorName: doctor.name }) });
    const result = await response.json();
    if (!response.ok) setError(result.error || "Could not book appointment.");
    else {
      setMessage("Appointment booked successfully!");
      setForm({ patientName: "", gender: "", phone: "", appointmentDate: "", appointmentTime: "" });
    }
    setLoading(false);
  }

  if (status === "loading" || !doctor) return <p className="p-8 text-center">Loading booking form...</p>;
  if (!session) return null;

  return (
    <main className="mx-auto my-10 grid w-full max-w-5xl gap-8 px-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-xl bg-blue-50 p-6">
        <img src={doctor.image} alt={doctor.name} className="mb-4 h-40 w-full rounded-lg object-cover" />
        <h1 className="text-xl font-bold">{doctor.name}</h1>
        <p className="text-blue-700">{doctor.specialty}</p>
        <p className="mt-3 text-sm text-gray-600">{doctor.hospital}</p>
        <p className="text-sm text-gray-600">Fee: {doctor.fee} BDT</p>
      </aside>
      <section className="rounded-xl bg-white p-6 shadow-lg md:p-8">
        <h2 className="text-3xl font-bold">Book Appointment</h2>
        <p className="mt-2 text-gray-600">Logged in as {session.user.email}</p>
        {message && <p className="mt-4 rounded-md bg-green-50 p-3 text-green-700">{message}</p>}
        {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-gray-700">Patient Name<input required value={form.patientName} onChange={event => setForm({ ...form, patientName: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <label className="text-sm font-medium text-gray-700">Gender<select required value={form.gender} onChange={event => setForm({ ...form, gender: event.target.value })} className="mt-1 w-full rounded-md border bg-white p-3"><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></label>
          <label className="text-sm font-medium text-gray-700">Phone<input required type="tel" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <label className="text-sm font-medium text-gray-700">Appointment Date<input required type="date" min={new Date().toISOString().split("T")[0]} value={form.appointmentDate} onChange={event => setForm({ ...form, appointmentDate: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <label className="text-sm font-medium text-gray-700 md:col-span-2">Appointment Time<input required type="time" value={form.appointmentTime} onChange={event => setForm({ ...form, appointmentTime: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <button disabled={loading} className="md:col-span-2 rounded-md bg-green-600 p-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60">{loading ? "Booking..." : "Confirm Appointment"}</button>
        </form>
      </section>
    </main>
  );
}

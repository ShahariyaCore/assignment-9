"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const emptyAppointment = { patientName: "", gender: "", phone: "", appointmentDate: "", appointmentTime: "" };

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [profile, setProfile] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", photoUrl: "" });
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin?callbackUrl=/dashboard");
  }, [router, status]);

  useEffect(() => {
    if (status !== "authenticated") return;
    Promise.all([fetch("/api/appointments"), fetch("/api/profile")])
      .then(async ([appointmentsResponse, profileResponse]) => {
        if (!appointmentsResponse.ok || !profileResponse.ok) throw new Error("Unable to load dashboard");
        return Promise.all([appointmentsResponse.json(), profileResponse.json()]);
      })
      .then(([appointmentData, profileData]) => {
        setAppointments(appointmentData);
        setProfile(profileData);
      })
      .catch(() => setError("Dashboard data could not be loaded."));
  }, [status]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function updateAppointment(event) {
    event.preventDefault();
    const response = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingAppointment),
    });
    const result = await response.json();
    if (!response.ok) return setError(result.error || "Could not update appointment.");
    setAppointments(current => current.map(item => item._id === result._id ? result : item));
    setEditingAppointment(null);
    setToast("Appointment updated successfully!");
  }

  async function deleteAppointment(id) {
    if (!window.confirm("Delete this appointment?")) return;
    const response = await fetch("/api/appointments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    if (!response.ok) return setError(result.error || "Could not delete appointment.");
    setAppointments(current => current.filter(item => item._id !== id));
    setToast("Appointment deleted successfully!");
  }

  async function updateProfile(event) {
    event.preventDefault();
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileForm),
    });
    const result = await response.json();
    if (!response.ok) return setError(result.error || "Could not update profile.");
    setProfile(result);
    setEditingProfile(false);
    setToast("Profile updated successfully!");
  }

  if (status === "loading" || !session || !profile) return <p className="p-8 text-center">Loading dashboard...</p>;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Private Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">Welcome, {profile.name}</h1>
      </div>
      {toast && <div role="status" className="fixed right-6 top-6 z-50 rounded-md bg-green-600 px-5 py-3 text-white shadow-lg">{toast}</div>}
      {error && <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700">{error}</div>}

      <section className="mb-10 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {profile.photoUrl ? <img src={profile.photoUrl} alt={profile.name} className="h-20 w-20 rounded-full object-cover" /> : <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">{profile.name[0]}</div>}
            <div><h2 className="text-xl font-bold">My Profile</h2><p className="text-gray-700">{profile.name}</p><p className="text-sm text-gray-500">{profile.email}</p></div>
          </div>
          <button onClick={() => { setProfileForm({ name: profile.name, photoUrl: profile.photoUrl }); setEditingProfile(true); }} className="rounded-md border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-50">Update Profile</button>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">My Bookings</h2><span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">{appointments.length} total</span></div>
        {appointments.length === 0 ? <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">No appointments booked yet.</div> : <div className="grid gap-5 md:grid-cols-2">{appointments.map(appointment => <article key={appointment._id} className="rounded-xl bg-white p-6 shadow-lg"><div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-bold">{appointment.doctorName}</h3><p className="text-sm text-blue-700">{appointment.appointmentDate} at {appointment.appointmentTime}</p></div><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Booked</span></div><dl className="mt-5 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-gray-500">Patient</dt><dd>{appointment.patientName}</dd></div><div><dt className="text-gray-500">Gender</dt><dd>{appointment.gender}</dd></div><div><dt className="text-gray-500">Phone</dt><dd>{appointment.phone}</dd></div><div><dt className="text-gray-500">Email</dt><dd className="truncate">{appointment.userEmail}</dd></div></dl><div className="mt-5 flex gap-3"><button onClick={() => setEditingAppointment({ ...appointment })} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Update</button><button onClick={() => deleteAppointment(appointment._id)} className="rounded-md border border-red-600 px-4 py-2 text-sm font-semibold text-red-600">Delete</button></div></article>)}</div>}
      </section>

      {editingAppointment && <Modal title="Update Appointment" onClose={() => setEditingAppointment(null)}><form onSubmit={updateAppointment} className="space-y-4"><ReadOnly label="Doctor" value={editingAppointment.doctorName} /><ReadOnly label="Email" value={editingAppointment.userEmail} />{appointmentFields(editingAppointment, setEditingAppointment)}<button className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white">Save Changes</button></form></Modal>}
      {editingProfile && <Modal title="Update Profile" onClose={() => setEditingProfile(false)}><form onSubmit={updateProfile} className="space-y-4"><label className="block text-sm font-medium">Name<input required value={profileForm.name} onChange={event => setProfileForm({ ...profileForm, name: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label><label className="block text-sm font-medium">Photo URL<input type="url" value={profileForm.photoUrl} onChange={event => setProfileForm({ ...profileForm, photoUrl: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label><button className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white">Save Profile</button></form></Modal>}
    </main>
  );
}

function appointmentFields(form, setForm) {
  return <><label className="block text-sm font-medium">Patient Name<input required value={form.patientName} onChange={event => setForm({ ...form, patientName: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label><label className="block text-sm font-medium">Gender<select required value={form.gender} onChange={event => setForm({ ...form, gender: event.target.value })} className="mt-1 w-full rounded-md border bg-white p-3"><option>Male</option><option>Female</option><option>Other</option></select></label><label className="block text-sm font-medium">Phone<input required value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label><label className="block text-sm font-medium">Appointment Date<input required type="date" value={form.appointmentDate} onChange={event => setForm({ ...form, appointmentDate: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label><label className="block text-sm font-medium">Appointment Time<input required type="time" value={form.appointmentTime} onChange={event => setForm({ ...form, appointmentTime: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label></>;
}

function ReadOnly({ label, value }) { return <label className="block text-sm font-medium text-gray-600">{label}<input readOnly value={value} className="mt-1 w-full rounded-md border bg-gray-100 p-3" /></label>; }
function Modal({ title, onClose, children }) { return <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"><div role="dialog" aria-modal="true" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold">{title}</h2><button type="button" onClick={onClose} aria-label="Close" className="text-2xl text-gray-500">&times;</button></div>{children}</div></div>; }

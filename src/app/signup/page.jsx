"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoUrl: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!passwordPattern.test(form.password)) {
      setError("Password must contain uppercase and lowercase letters and be at least 6 characters.");
      return;
    }
    setLoading(true);
    const response = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    if (!response.ok) setError(result.error || "Registration failed.");
    else router.push("/signin");
    setLoading(false);
  }

  return (
    <main className="mx-auto my-12 w-full max-w-md px-6">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Register</h1>
        {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Name<input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <label className="block text-sm font-medium text-gray-700">Email<input required type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <label className="block text-sm font-medium text-gray-700">Photo URL<input type="url" value={form.photoUrl} onChange={event => setForm({ ...form, photoUrl: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <label className="block text-sm font-medium text-gray-700">Password<input required type="password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} className="mt-1 w-full rounded-md border p-3" /><span className="mt-1 block text-xs text-gray-500">At least 6 characters, including uppercase and lowercase letters.</span></label>
          <button disabled={loading} className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white disabled:opacity-60">{loading ? "Creating account..." : "Register"}</button>
        </form>
        <button type="button" onClick={() => signIn("google", { callbackUrl: "/" })} className="mt-3 w-full rounded-md border p-3 font-semibold text-gray-700 hover:bg-gray-50">Continue with Google</button>
        <p className="mt-5 text-sm text-gray-600">Already have an account? <Link href="/signin" className="font-semibold text-blue-600">Login</Link></p>
      </div>
    </main>
  );
}

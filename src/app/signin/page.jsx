"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [callbackUrl] = useState(() => {
    if (typeof window === "undefined") return "/";
    const requestedUrl = new URLSearchParams(window.location.search).get("callbackUrl");
    return requestedUrl?.startsWith("/") ? requestedUrl : "/";
  });
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { ...form, redirect: false, callbackUrl });
    if (result?.error) setError("Invalid email or password.");
    else router.push(callbackUrl);
    setLoading(false);
  }

  async function handleGoogle() {
    setError("");
    await signIn("google", { callbackUrl });
  }

  return (
    <main className="mx-auto my-12 w-full max-w-md px-6">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Login</h1>
        {error && <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Email<input required type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <label className="block text-sm font-medium text-gray-700">Password<input required type="password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} className="mt-1 w-full rounded-md border p-3" /></label>
          <button disabled={loading} className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white disabled:opacity-60">{loading ? "Logging in..." : "Login"}</button>
        </form>
        <button type="button" onClick={handleGoogle} className="mt-3 w-full rounded-md border p-3 font-semibold text-gray-700 hover:bg-gray-50">Continue with Google</button>
        <p className="mt-5 text-sm text-gray-600"><span className="text-gray-500">Forgot Password</span></p>
        <p className="mt-2 text-sm text-gray-600">Don&apos;t have an account? <Link href="/signup" className="font-semibold text-blue-600">Register</Link></p>
      </div>
    </main>
  );
}

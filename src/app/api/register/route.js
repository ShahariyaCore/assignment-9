import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export async function POST(request) {
  const { name, email, photoUrl, password } = await request.json();

  if (!name?.trim() || !email?.trim() || !password) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
  }
  if (!passwordPattern.test(password)) {
    return NextResponse.json({ error: "Password must contain uppercase and lowercase letters and be at least 6 characters." }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const client = await clientPromise;
  const users = client.db("medical").collection("users");
  if (await users.findOne({ email: normalizedEmail })) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  await users.insertOne({
    name: name.trim(),
    email: normalizedEmail,
    photoUrl: photoUrl?.trim() || "",
    password: await bcrypt.hash(password, 12),
    provider: "credentials",
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Registration successful." }, { status: 201 });
}

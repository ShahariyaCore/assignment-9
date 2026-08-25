import { NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";

async function currentUser() {
  const session = await auth();
  if (!session?.user?.email) return null;
  const client = await clientPromise;
  const user = await client.db("medical").collection("users").findOne(
    { email: session.user.email.toLowerCase() },
    { projection: { password: 0 } }
  );
  return { session, client, user };
}

export async function GET() {
  const result = await currentUser();
  if (!result?.user) return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  return NextResponse.json({
    name: result.user.name || "",
    email: result.user.email,
    photoUrl: result.user.photoUrl || result.user.image || "",
  });
}

export async function PATCH(request) {
  const result = await currentUser();
  if (!result?.user) return NextResponse.json({ error: "You must be logged in." }, { status: 401 });

  const { name, photoUrl } = await request.json();
  if (!name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });

  const profile = { name: name.trim(), photoUrl: photoUrl?.trim() || "", updatedAt: new Date() };
  await result.client.db("medical").collection("users").updateOne(
    { email: result.session.user.email.toLowerCase() },
    { $set: profile }
  );
  return NextResponse.json({ name: profile.name, email: result.user.email, photoUrl: profile.photoUrl });
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";

const editableFields = ["patientName", "gender", "phone", "appointmentDate", "appointmentTime"];

async function getOwnedAppointments(email) {
  const client = await clientPromise;
  return client.db("medical").collection("appointments");
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const appointments = await getOwnedAppointments(session.user.email);
  const data = await appointments.find({ userEmail: session.user.email }).sort({ appointmentDate: 1 }).toArray();
  return NextResponse.json(data.map(appointment => ({ ...appointment, _id: appointment._id.toString() })));
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "You must be logged in to book an appointment." }, { status: 401 });
  }

  const body = await request.json();
  const requiredFields = ["doctorName", "patientName", "gender", "phone", "appointmentDate", "appointmentTime"];
  const missingField = requiredFields.find(field => !String(body[field] || "").trim());

  if (missingField) {
    return NextResponse.json({ error: `${missingField} is required.` }, { status: 400 });
  }

  const appointment = {
    userEmail: session.user.email,
    doctorName: String(body.doctorName).trim(),
    patientName: String(body.patientName).trim(),
    gender: String(body.gender).trim(),
    phone: String(body.phone).trim(),
    appointmentDate: String(body.appointmentDate).trim(),
    appointmentTime: String(body.appointmentTime).trim(),
    createdAt: new Date(),
  };

  const client = await clientPromise;
  await client.db("medical").collection("appointments").insertOne(appointment);

  return NextResponse.json({ message: "Appointment booked successfully!" }, { status: 201 });
}

export async function PATCH(request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const { id, ...updates } = await request.json();
  const values = Object.fromEntries(editableFields.map(field => [field, String(updates[field] || "").trim()]));
  if (!id || Object.values(values).some(value => !value)) {
    return NextResponse.json({ error: "All appointment fields are required." }, { status: 400 });
  }

  const appointments = await getOwnedAppointments(session.user.email);
  const result = await appointments.findOneAndUpdate(
    { _id: new (await import("mongodb")).ObjectId(id), userEmail: session.user.email },
    { $set: { ...values, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  if (!result) return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  return NextResponse.json({ ...result, _id: result._id.toString() });
}

export async function DELETE(request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Appointment id is required." }, { status: 400 });

  const appointments = await getOwnedAppointments(session.user.email);
  const result = await appointments.deleteOne({ _id: new (await import("mongodb")).ObjectId(id), userEmail: session.user.email });
  if (!result.deletedCount) return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  return NextResponse.json({ message: "Appointment deleted successfully!" });
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Note } from "@/models/Note";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  await connectDB();
  const note = await Note.create({ title, content });
  return NextResponse.json(note);
}

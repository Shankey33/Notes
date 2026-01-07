import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Note } from "@/models/Note";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { title, content } = await req.json();
  await connectDB();
  const updated = await Note.findByIdAndUpdate(
    id,
    { title, content },
    { new: true }
  );
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  await Note.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

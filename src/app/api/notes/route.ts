import { prisma } from "@/lib/client";
import { NoteValidator } from "@/lib/validators";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = NoteValidator.parse(body);
    if (!title) {
      return new NextResponse("Note title is required", { status: 403 });
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(newNote);
  } catch (error) {
    console.log("NOTES_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

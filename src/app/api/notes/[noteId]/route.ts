import { prisma } from "@/lib/client";
import { NextResponse } from "next/server";

interface Props {
  params: {
    noteId: string;
  };
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const noteId = params.noteId;

    if (!noteId) {
      return new NextResponse("Note ID is required.", { status: 400 });
    }
    const deletedNote = await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    return NextResponse.json(deletedNote);
  } catch (error) {
    console.log("NOTE_ID_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function PATCH(req: Request, { params }: Props) {
  try {
    const noteId = params.noteId;
    const values = await req.json();

    if (!noteId) {
      return new NextResponse("Note ID is required.", { status: 400 });
    }
    const updatedNote = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(updatedNote);
  } catch (error) {
    console.log("NOTE_ID_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

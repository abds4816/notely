import DeleteNote from "@/components/delete-note";
import EditNote from "@/components/edit-note";
import NoteDialog from "@/components/note-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/client";
import { ArrowLeft, Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    noteId: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const note = await prisma.note.findUnique({
    where: {
      id: params.noteId,
    },
  });
  if (!note) {
    return;
  }

  return {
    title: `${note.title} | notely`,
    description: note.description,
  };
}

export default async function page({ params }: PageProps) {
  const note = await prisma.note.findUnique({
    where: {
      id: params.noteId,
    },
  });

  if (!note) {
    return notFound();
  }
  return (
    <div className="py-12 space-y-8 text-center">
      {/* back buttton */}
      <Link
        href="/"
        className={buttonVariants({ variant: "link", size: "sm" })}
      >
        <ArrowLeft className="size-4" />
        <span>back to notes</span>
      </Link>
      {/* header */}
      <section className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight capitalize">
          {note.title}
        </h2>
        <div className="flex items-center gap-2">
          {/* edit note */}
          <NoteDialog label="update note" form={<EditNote data={note} />}>
            <Button variant="outline" size="icon">
              <Edit className="size-6" />
            </Button>
          </NoteDialog>
          {/* delete note */}
          <DeleteNote noteId={note.id} />
        </div>
      </section>
      {/* create date */}
      <small className="text-muted-foreground text-sm">
        Created at:{" "}
        <span className="text-foreground">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            dateStyle: "medium",
          })}
        </span>
      </small>
      {/* content */}
      <p className="max-w-5xl mx-auto text-muted-foreground leading-5 text-base md:text-lg">
        {note.description}
      </p>
    </div>
  );
}

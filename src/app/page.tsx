import CreateNote from "@/components/create-note";
import NoteDialog from "@/components/note-dialog";
import NoteItem from "@/components/note-item";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/client";
import { NotebookPen, Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notely | manage notes easely",
  description:
    "Discover the simplest way to manage your notes and stay organized. Sign up for free and start capturing your thoughts, ideas, and to-dos with Notely.",
};
export default async function Home() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="py-8 space-y-6 md:space-y-8">
      {/* page title */}
      <section className="flex items-center justify-between gap-6">
        <div className="space-y-1 md:space-y-2">
          <h2 className="font-bold text-3xl md:text-4xl tracking-tight capitalize">
            welcome to notely
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Create and manage your notes easely.
          </p>
        </div>
        {/* Note Dialog */}
        <NoteDialog label="Create Note" form={<CreateNote />}>
          <Button>
            <Plus className="size-4" />
            <span>add note</span>
          </Button>
        </NoteDialog>
      </section>
      {/* notes list */}
      {notes.length ? (
        notes.map((item) => <NoteItem key={item.id} item={item} />)
      ) : (
        <section className="py-12">
          <div className="w-full border border-dashed rounded-xl min-h-[30rem] grid place-content-center">
            <div className="flex flex-col items-center gap-4">
              {/* icon */}
              <div className="size-20 grid place-content-center bg-secondary rounded-full">
                <NotebookPen className="size-12 text-muted-foreground" />
              </div>
              {/* message */}
              <div className="space-y-3 text-center">
                <h4 className="font-semibold text-2xl">No notes added.</h4>
                <p className="text-muted-foreground">
                  You have not added any notes. Add one below.
                </p>
              </div>
              {/* CTA */}
              <NoteDialog label="Create Note" form={<CreateNote />}>
                <Button>
                  <Plus className="size-4" />
                  <span>add note</span>
                </Button>
              </NoteDialog>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

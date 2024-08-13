"use client";

import { FC, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";

interface DeleteNoteProps {
  noteId: string;
}

const DeleteNote: FC<DeleteNoteProps> = ({ noteId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const deleteNote = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/notes/${id}`);
      router.push("/");
      router.refresh();
      return toast({
        title: "Note was deleted successfully",
      });
    } catch (error) {
      return toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      disabled={isLoading}
      onClick={() => deleteNote(noteId)}
    >
      {isLoading ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <Trash className="size-5" />
      )}
    </Button>
  );
};

export default DeleteNote;

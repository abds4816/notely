import { Note } from "@prisma/client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

interface NoteItemProps {
  item: Note;
}

const NoteItem: FC<NoteItemProps> = ({ item }) => {
  return (
    <Card>
      <Link href={`/note/${item.id}`}>
        <CardHeader>
          <CardTitle className="capitalize">{item.title}</CardTitle>
          <CardDescription>
            created at:{" "}
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              dateStyle: "medium",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="xl:text-lg text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default NoteItem;

"use client";

import axios from "axios";
import { NoteRequest, NoteValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

const CreateNote = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<NoteRequest>({
    resolver: zodResolver(NoteValidator),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: NoteRequest) => {
    try {
      await axios.post("/api/notes", values);
      form.reset();
      router.refresh();
      return toast({
        title: "Note was added successfully!",
      });
    } catch (error) {
      return toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter note title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description{" "}
                <span className="text-sm text-muted-foreground">
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter note description..."
                  {...field}
                  className="resize-none h-60"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          <span>add note</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateNote;

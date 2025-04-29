"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type FormData = {
  title: string;
  description?: string;
  category: string;
  priority: string;
  dueDate: string;
};

export default function TicketForm({ initial }: { initial?: Partial<FormData> }) {
  const form = useForm<FormData>({ defaultValues: initial });
  const onSubmit = async (data: FormData) => {
    const method = initial ? "PUT" : "POST";
    const url = initial ? `/api/tickets/${initial.id}` : "/api/tickets";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // handle redirect etc.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 card">
        <FormField
          control={form.control}
          name="title"
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Ticket title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Optional details" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          {["category","priority"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{name}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Select ${name}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {(name==="category" ? ["GENERAL","SALESFORCE","NETWORKING"]
                                           : ["LOW","MEDIUM","HIGH","CRITICAL"]
                      ).map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt.replace("_"," ").toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initial ? "Update Ticket" : "Create Ticket"}
        </Button>
      </form>
    </Form>
  );
}


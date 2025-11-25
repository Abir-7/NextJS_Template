"use client";

import { Form } from "@/components/ui/form";
import { ReactNode } from "react";
import { UseFormReturn, SubmitHandler, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RHFFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  children: ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
  className?: string;
}

export function RHFForm<T extends FieldValues>({
  form,
  children,
  className,
  onSubmit,
  ...props
}: RHFFormProps<T>) {
  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      await onSubmit(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-4", className)}
        {...props}
      >
        {children}
      </form>
    </Form>
  );
}

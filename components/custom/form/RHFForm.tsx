/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form } from "@/components/ui/form";
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
interface RHFFormProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: Partial<T>;
  className?: string;
  schema?: ZodType<T, any, any>; // optional Zod schema for validation
}

export function RHFForm<T extends FieldValues>({
  children,
  className,
  onSubmit,
  defaultValues,
  schema,
  ...props
}: RHFFormProps<T>) {
  const form = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: schema ? zodResolver(schema as any) : undefined,
  });

  const handleSubmit = async (data: T) => {
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

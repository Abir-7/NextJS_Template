/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject, z } from "zod";

type UseZodFormOptions<Schema extends ZodObject> = Omit<
  UseFormProps<z.input<Schema>, any, z.output<Schema>>,
  "resolver"
> & {
  schema: Schema;
};

export function useZodForm<Schema extends ZodObject>(
  opts: UseZodFormOptions<Schema>
) {
  const { schema, ...rest } = opts;

  return useForm<z.input<Schema>, any, z.output<Schema>>({
    resolver: zodResolver(schema),
    ...rest,
  });
}

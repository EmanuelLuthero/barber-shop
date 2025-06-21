import { z } from 'zod';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

export type ObjectOrEffect =
  | z.ZodObject<any, any, any>
  | z.ZodEffects<z.ZodObject<any, any, any>, any, any>;

export type FormFieldProps = ControllerRenderProps & {
  hasError: boolean;
};

export type FormItemConfig = {
  Component: React.FC<FormFieldProps>;
  FieldSummary?: React.FC;
  label?: string;
};

export type FormConfig<TSchema extends ObjectOrEffect> = {
  form: UseFormReturn<z.infer<TSchema>>;
  items: Record<keyof z.infer<TSchema>, FormItemConfig>;
};

import { z } from 'zod';
import { useEffect } from 'react';
import { View, ViewProps } from 'react-native';
import { Controller, Path } from 'react-hook-form';

import { FormConfig, ObjectOrEffect } from '@lib/types/form';
import { Label } from './Label';
import { Button } from './Button';
import { cn } from '@lib/utils/tailwind';

type Props<TSchema extends ObjectOrEffect> = {
  config: FormConfig<TSchema>;
  buttonLabel: string;
  onSubmit: (data: any) => void;
  className?: ViewProps['className'];
  containerClassName?: ViewProps['className'];
};

export const Form = <TSchema extends ObjectOrEffect>({
  config,
  onSubmit,
  buttonLabel,
  className,
  containerClassName,
}: Props<TSchema>) => {
  const { items, form } = config;
  const { register, handleSubmit, formState, control } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    Object.keys(items).forEach((key) => {
      register(key as Path<z.infer<TSchema>>);
    });
  });

  return (
    <View className={cn('gap-8', containerClassName)}>
      <View className={cn('gap-4', className)}>
        {Object.entries(items).map(([key, { Component, FieldSummary, label }]) => {
          const error = formState.errors[key as keyof z.infer<TSchema>];
          const message = error?.message as string;

          return (
            <View key={key} className="gap-2">
              <Controller
                control={control}
                name={key as Path<z.infer<TSchema>>}
                render={({ field }) => (
                  <View className="gap-2">
                    {label && <Label label={label} />}
                    <Component hasError={!!error} {...field} />
                    {formState.errors[key as keyof z.infer<TSchema>] && (
                      <Label label={message || ''} hasError />
                    )}
                    {FieldSummary && <FieldSummary />}
                  </View>
                )}
              />
            </View>
          );
        })}
      </View>

      <Button label={buttonLabel} onPress={handleSubmit(onSubmit)} isLoading={isSubmitting} />
    </View>
  );
};

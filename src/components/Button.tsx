import { cn } from '@lib/utils/tailwind';
import { cva } from 'class-variance-authority';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Variants = 'primary' | 'neutral' | 'transparent';

type Props = TouchableOpacityProps & {
  label: string;
  variant?: Variants;
  hasBorder?: boolean;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  label,
  className,
  onPress,
  disabled,
  hasBorder = false,
  variant = 'primary',
  isLoading = false,
}) => {
  const border = hasBorder ? variant : undefined;
  const text = variant === 'transparent' ? variant : undefined;

  return (
    <TouchableOpacity
      className={cn(
        'items-center rounded-lg py-4',
        buttonVariants({ background: variant, border: border }),
        className,
        { 'flex-row justify-center gap-2': isLoading }
      )}
      onPress={onPress}
      disabled={isLoading || disabled}>
      <Text className={cn('text-lg font-bold', buttonVariants({ text }))}>
        {!isLoading ? label : 'Carregando...'}
      </Text>
      {isLoading && <ActivityIndicator color="#fff" />}
    </TouchableOpacity>
  );
};

const buttonVariants = cva('', {
  variants: {
    background: {
      primary: 'bg-primary-base',
      neutral: 'bg-neutral-soft',
      transparent: 'bg-transparent',
    },
    text: {
      transparent: 'text-primary-base',
    },
    border: {
      primary: 'border border-black',
      neutral: 'border-2 border-neutral-soft',
      transparent: 'border border-primary-base',
    },
  },
});

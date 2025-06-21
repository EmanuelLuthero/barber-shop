import { cn } from '@lib/utils/tailwind';
import { Text } from 'react-native';

type Props = {
  label: string;
  hasError?: boolean;
};

export const Label: React.FC<Props> = ({ label, hasError = false }) => {
  return (
    <Text
      className={cn('font-bold text-neutral-ultra-light', {
        'text-danger-soft': hasError,
      })}>
      {label}
    </Text>
  );
};

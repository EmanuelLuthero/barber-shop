import { cn } from '@lib/utils/tailwind';
import { ScrollView, View, ViewProps } from 'react-native';

type Props = {
  children: React.ReactNode;
  className?: ViewProps['className'];
};

export const Wrapper: React.FC<Props> = ({ children, className }) => (
  <ScrollView className="flex-1 bg-neutral-ultra-dark">
    <View className={cn('p-4', className)}>{children}</View>
  </ScrollView>
);

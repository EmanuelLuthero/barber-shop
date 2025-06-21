import { cn } from '@lib/utils/tailwind';
import { ArrowLeft, ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = {
  className?: TouchableOpacityProps['className'];
  onPress: () => void;
};

export const BackButton: React.FC<Props> = ({ onPress, className }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn('rounded-full bg-neutral-dark p-2 shadow shadow-white', className)}>
      <ChevronLeft stroke={'#fff'} width={20} height={20} />
    </TouchableOpacity>
  );
};

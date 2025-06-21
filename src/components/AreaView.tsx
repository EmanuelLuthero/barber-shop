import { Platform, SafeAreaView as IosSafeAreaView } from 'react-native';
import {
  SafeAreaView as AndroidSafeAreaView,
  NativeSafeAreaViewProps,
} from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  className?: NativeSafeAreaViewProps['className'];
};

export const AreaView: React.FC<Props> = ({ children, className }) => {
  const osType = Platform.OS === 'ios' ? 'ios' : 'android';

  return osType === 'ios' ? (
    <IosSafeAreaView className={className}>{children}</IosSafeAreaView>
  ) : (
    <AndroidSafeAreaView className={className}>{children}</AndroidSafeAreaView>
  );
};

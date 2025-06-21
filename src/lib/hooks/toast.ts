import Toast, { ToastOptions } from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ShowToastArgs extends Omit<ToastOptions, 'type'> {
  type?: ToastType;
  title: string;
  message?: string;
}

export function useToast() {
  function showToast({
    type = 'success',
    title,
    message,
    position = 'top',
    visibilityTime = 4000,
    ...rest
  }: ShowToastArgs) {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position,
      visibilityTime,
      ...rest,
    });
  }

  function hideToast() {
    Toast.hide();
  }

  return { showToast, hideToast };
}

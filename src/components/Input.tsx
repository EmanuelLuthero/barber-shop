import { cn } from '@lib/utils/tailwind';
import { TextInput, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Label } from './Label';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';

type Props = TextInputProps & {
  placeholder: string;
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  type?: 'text' | 'password';
  lowercase?: boolean
};

export const Input: React.FC<Props> = ({
  label,
  errorMessage,
  hasError = false,
  type = 'text',
  value,
  lowercase,
  ...props
}) => {
  const [hidden, setHidden] = useState(type === 'password');
  const autoCapitalize =
    lowercase
      ? 'none'
      : props.autoCapitalize ?? 'sentences';

  return (
    <View className="gap-2">
      {label && <Label label={label} />}
      <View className="relative">
        <TextInput
          className={cn(
            'rounded-lg border border-neutral-soft bg-neutral-base px-2 py-3 text-lg text-white placeholder:text-neutral-soft focus:border-2 focus:border-primary-base',
            {
              'border-2 border-danger-dark focus:border-danger-dark': hasError,
              'pr-10': type === 'password',
            }
          )}
          secureTextEntry={hidden}
          autoCapitalize={autoCapitalize}
          {...props}
        />
        {type === 'password' && <PasswordToggle hidden={hidden} setHidden={setHidden} />}
      </View>

      {hasError && errorMessage && (
        <Text className="text-sm font-medium text-danger-soft">{errorMessage}</Text>
      )}
    </View>
  );
};

const PasswordToggle: React.FC<{ hidden: boolean; setHidden: (value: boolean) => void }> = ({
  hidden,
  setHidden,
}) => (
  <TouchableOpacity
    onPress={() => setHidden(!hidden)}
    className="absolute right-2 top-1/2 -translate-y-1/2"
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
    {hidden ? <EyeOff size={24} fill="#A1A1AA" /> : <Eye size={24} fill="#A1A1AA" />}
  </TouchableOpacity>
);

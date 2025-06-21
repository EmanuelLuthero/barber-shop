import { Input } from '@components/Input';
import { FormFieldProps } from '@lib/types/form';

export const PasswordFormInput: React.FC<FormFieldProps> = ({
  onBlur,
  onChange,
  value,
  hasError,
}) => (
  <Input
    type="password"
    placeholder="******"
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    hasError={hasError}
  />
);

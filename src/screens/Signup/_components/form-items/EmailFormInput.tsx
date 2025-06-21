import { Input } from '@components/Input';
import { FormFieldProps } from '@lib/types/form';

export const EmailFormInput: React.FC<FormFieldProps> = ({ onBlur, onChange, value, hasError }) => (
  <Input
    placeholder="ex: cliente@gmail.com"
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    hasError={hasError}
    lowercase
  />
);

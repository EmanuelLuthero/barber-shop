import { Input } from '@components/Input';
import { FormFieldProps } from '@lib/types/form';

export const EmailFormInput: React.FC<FormFieldProps> = ({ onBlur, onChange, value, hasError }) => (
  <Input
    placeholder="Entre com seu email"
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    hasError={hasError}
    lowercase
  />
);

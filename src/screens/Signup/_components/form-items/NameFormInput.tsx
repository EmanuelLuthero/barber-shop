import { Input } from '@components/Input';
import { FormFieldProps } from '@lib/types/form';

export const NameFormInput: React.FC<FormFieldProps> = ({ onBlur, onChange, value, hasError }) => (
  <Input
    placeholder="Entre com seu nome completo"
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    hasError={hasError}
    lowercase
  />
);

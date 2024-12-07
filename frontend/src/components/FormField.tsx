import Form from "react-bootstrap/Form";

interface FormFieldProps {
  controlId: string;
  label: string;
  type: string;
  placeholder: string;
  defaultValue?: string;
  onChange?: any;
  value?: any;
}

const FormField = ({
  controlId,
  label,
  type,
  placeholder,
  defaultValue,
  onChange,
  value,
}: FormFieldProps) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      value={value}
      onChange={onChange}
      required
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </Form.Group>
);
export default FormField;

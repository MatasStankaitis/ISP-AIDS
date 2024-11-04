import Form from "react-bootstrap/Form";

const FormField = ({ controlId, label, type, placeholder, defaultValue }) => (
  <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      required
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </Form.Group>
);
export default FormField;

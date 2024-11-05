import { FC, ChangeEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

interface RequestFormProps {
  newRequest: string;
  requestType: string;
  onRequestChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

const RequestForm: FC<RequestFormProps> = ({
  newRequest,
  requestType,
  onRequestChange,
  onTypeChange,
  onSubmit,
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Group controlId="requestForm">
      <Form.Label>Naujas prašymas</Form.Label>
      <Form.Control
        type="text"
        value={newRequest}
        onChange={onRequestChange}
        placeholder="Įveskite prašymą"
      />
    </Form.Group>
    <Form.Group controlId="requestType">
      <Form.Label>Prašymo tipas</Form.Label>
      <Form.Control as="select" value={requestType} onChange={onTypeChange}>
        <option value="">Pasirinkite tipą...</option>
        <option value="Type 1">Tipas 1</option>
        <option value="Type 2">Tipas 2</option>
        <option value="Type 3">Tipas 3</option>
      </Form.Control>
    </Form.Group>
    <Button variant="primary" type="submit">
      Pridėti prašymą
    </Button>
  </Form>
);

export default RequestForm;
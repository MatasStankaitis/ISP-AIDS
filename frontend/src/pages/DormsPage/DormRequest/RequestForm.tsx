// frontend/src/pages/DormsPage/RequestManagement/RequestForm.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button } from "react-bootstrap";

interface RequestFormProps {
  onSubmit: (title: string, type: string, description: string) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(title, type, description);
  };

  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="requestTitle">
        <Form.Label>Pavadinimas</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Įveskite pavadinimą"
          required
        />
      </Form.Group>
      <Form.Group controlId="requestType">
        <Form.Label>Prašymo tipas</Form.Label>
        <Form.Control as="select" value={type} onChange={handleTypeChange} required>
          <option value="">Pasirinkti tipą...</option>
          <option value="1">Svečio nakvynė</option>
          <option value="2">Kambario pakeitimas</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="requestDescription">
        <Form.Label>Aprašymas</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sukurti prašymą
      </Button>
    </Form>
  );
};

export default RequestForm;
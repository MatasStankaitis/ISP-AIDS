// frontend/src/pages/DormsPage/DormManagement/DormForm.tsx
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface DormFormProps {
  onSubmit: (dormName: number | "", dormAddress: string, roomCount: number) => void;
  submitButtonText: string;
  title: string;
}

const DormForm: React.FC<DormFormProps> = ({ onSubmit, submitButtonText, title }) => {
  const [dormName, setDormName] = useState<number | "">("");
  const [dormAddress, setDormAddress] = useState("");
  const [roomCount, setRoomCount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      dormName !== "" ? Number(dormName) : "",
      dormAddress,
      roomCount !== "" ? Number(roomCount) : 0
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <Form.Group controlId="dormName">
        <Form.Label>Bendrabučio numeris</Form.Label>
        <Form.Control
          type="number"
          value={dormName}
          onChange={(e) => setDormName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="dormAddress">
        <Form.Label>Adresas</Form.Label>
        <Form.Control
          type="text"
          value={dormAddress}
          onChange={(e) => setDormAddress(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="roomCount">
        <Form.Label>Kambarių skaičius</Form.Label>
        <Form.Control
          type="number"
          value={roomCount}
          onChange={(e) => setRoomCount(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default DormForm;
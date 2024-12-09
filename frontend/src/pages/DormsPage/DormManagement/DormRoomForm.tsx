// frontend/src/pages/DormsPage/DormManagement/DormRoomForm.tsx
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface DormRoomFormProps {
  onSubmit: (roomData: {
    roomNumber: number;
    floorNumber: number;
    price: number;
    quality: number;
    status: number;
  }) => void;
  submitButtonText: string;
  title: string;
}

const DormRoomForm: React.FC<DormRoomFormProps> = ({
  onSubmit,
  submitButtonText,
  title,
}) => {
  const [roomNumber, setRoomNumber] = useState<number | "">("");
  const [floorNumber, setFloorNumber] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [quality, setQuality] = useState<number>(1);
  const [status, setStatus] = useState<number>(1); // Assuming 1 is available

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      roomNumber: roomNumber !== "" ? Number(roomNumber) : 0,
      floorNumber: floorNumber !== "" ? Number(floorNumber) : 0,
      price: price !== "" ? Number(price) : 0,
      quality,
      status,
    });

    setRoomNumber("");
    setFloorNumber("");
    setPrice("");
    setQuality(1);
    setStatus(1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <Form.Group controlId="roomNumber">
        <Form.Label>Kambario numeris</Form.Label>
        <Form.Control
          type="number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="floorNumber">
        <Form.Label>Aukštas</Form.Label>
        <Form.Control
          type="number"
          value={floorNumber}
          onChange={(e) => setFloorNumber(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Kaina</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="quality">
        <Form.Label>Būklė</Form.Label>
        <Form.Control
          as="select"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          required
        >
          <option value="1">Nauja</option>
          <option value="2">Vidutinė</option>
          <option value="3">Prasta</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="status">
        <Form.Label>Užimtumas</Form.Label>
        <Form.Control
          as="select"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          required
        >
          <option value="1">Laisvas</option>
          <option value="2">Užimtas</option>
          <option value="3">Rezervuotas</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        {submitButtonText}
      </Button>
    </Form>
  );
};

export default DormRoomForm;
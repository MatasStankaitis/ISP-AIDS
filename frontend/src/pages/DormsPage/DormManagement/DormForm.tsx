import { useState, ChangeEvent, FormEvent } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

interface DormFormProps {
  initialDormName?: number | "";
  initialDormAddress?: string;
  onSubmit: (dormName: number | "", dormAddress: string) => void;
  submitButtonText: string;
  title: string;
}

const DormForm = ({
  initialDormName = "",
  initialDormAddress = "",
  onSubmit,
  submitButtonText,
  title,
}: DormFormProps) => {
  const [dormName, setDormName] = useState<number | "">(initialDormName);
  const [dormAddress, setDormAddress] = useState<string>(initialDormAddress);

  const handleDormNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDormName(e.target.valueAsNumber || "");
  };

  const handleDormAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDormAddress(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(dormName, dormAddress);
  };

  return (
    <Container>
      <h1>{title}</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="dormName">
              <Form.Label>Bendrabučio nr.</Form.Label>
              <Form.Control
                type="number"
                placeholder="Įveskite bendrabučio nr"
                min="1"
                step="1"
                value={dormName}
                onChange={handleDormNameChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dormAddress">
              <Form.Label>Adresas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Įveskite adresą"
                value={dormAddress}
                onChange={handleDormAddressChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {submitButtonText}
        </Button>
      </Form>
    </Container>
  );
};

export default DormForm;
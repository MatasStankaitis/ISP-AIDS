// frontend/src/pages/DormsPage/RequestManagement/RequestFilter.tsx
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

interface RequestFilterProps {
  onFilter: (filters: { username: string; type: string; status: string }) => void;
}

const RequestFilter: React.FC<RequestFilterProps> = ({ onFilter }) => {
  const [username, setUsername] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ username, type, status });
  };

  return (
    <Form onSubmit={handleFilter} className="mb-4">
      <Row>
        <Col>
          <Form.Group controlId="filterUsername">
            <Form.Label>Studento naudotojo vardas</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Įveskite naudotojo vardą"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" className="mt-3">
        Filtruoti
      </Button>
    </Form>
  );
};

export default RequestFilter;
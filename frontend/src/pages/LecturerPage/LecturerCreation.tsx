import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const LecturerCreation = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = () => {
    // Simulate API save
    alert(`Lecturer ${name} added to department ${department}`);
  };

  return (
    <Container>
      <h1>Create Lecturer</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter lecturer's name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Control
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default LecturerCreation;
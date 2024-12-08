import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const SubjectCreation = () => {
  const [formState, setFormState] = useState({
    code: "",
    name: "",
    credits: "",
    description: "",
    language: "",
    is_remote: false,
    fk_Facultyid: 0,
  });
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/faculties`)
      .then((response) => response.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error("Error fetching faculties:", error));
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => response.json())
      .then(() => navigate("/subjects"))
      .catch((error) => console.error("Error creating subject:", error));
  };

  return (
    <Container>
      <h1>Create Subject</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="code">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            value={formState.code}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="credits">
          <Form.Label>Credits</Form.Label>
          <Form.Control
            type="number"
            value={formState.credits}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={formState.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="language">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            value={formState.language}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="is_remote">
          <Form.Check
            type="checkbox"
            label="Remote"
            checked={formState.is_remote}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="fk_Facultyid">
          <Form.Label>Faculty</Form.Label>
          <Form.Control
            as="select"
            value={formState.fk_Facultyid}
            onChange={handleChange}
            required
          >
            <option value="">Select Faculty...</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default SubjectCreation;

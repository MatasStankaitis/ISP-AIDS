import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../constants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const SubjectCreation = () => {
  const [formState, setFormState] = useState({
    code: "",
    name: "",
    credits: "",
    description: "",
    language: "",
    is_remote: false,
    fk_Facultyid: 0,
    year: "",
  });
  const [faculties, setFaculties] = useState([]);
  const [error, setError] = useState(null);
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
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Failed to create subject");
          });
        }
        return response.json();
      })
      .then(() => navigate("/home/subjects"))
      .catch((error) => setError(error.message));
  };

  return (
    <Container>
      <h1>Sukurt modulį</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="code">
          <Form.Label>Kodas</Form.Label>
          <Form.Control
            type="text"
            value={formState.code}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="name">
          <Form.Label>Pavadinimas</Form.Label>
          <Form.Control
            type="text"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="credits">
          <Form.Label>Kreditų sk.</Form.Label>
          <Form.Control
            type="number"
            value={formState.credits}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Aprašymas</Form.Label>
          <Form.Control
            type="text"
            value={formState.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="language">
          <Form.Label>Kalba</Form.Label>
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
          <Form.Label>Fakultetas</Form.Label>
          <Form.Control
            as="select"
            value={formState.fk_Facultyid}
            onChange={handleChange}
            required
          >
            <option value="">Pasirinkti fakultetą...</option>
            {faculties.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {faculty.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="year">
          <Form.Label>Metai</Form.Label>
          <Form.Control
            type="number"
            value={formState.year}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sukūrti
        </Button>
        <Link to="/home/subjects">
          <Button variant="secondary" className="ms-2">
            Atgal į modulių sąrašą
          </Button>
        </Link>
      </Form>
    </Container>
  );
};

export default SubjectCreation;
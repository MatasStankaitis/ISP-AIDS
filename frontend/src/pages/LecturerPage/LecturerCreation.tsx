import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/FormField";
import FACULTIES from "../../prototypeData/faculties";
import LECTURER_STATUSES from "../../prototypeData/lecturerStatuses";
import { baseUrl } from "../../constants";

const LecturerCreation = () => {
  const [error, setError] = useState<string | null>(null);
  const [faculties, setFaculties] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [genders, setGenders] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    home_address: "",
    gender: "", // For gender dropdown
    current_salary: "",
    faculty: "",
    status: "",
    picture_url: "",
  });

  const navigate = useNavigate();

  // Fetch Genders
  const fetchGenders = () => {
    fetch(`${baseUrl}/lecturers/genders`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGenders(data);
      })
      .catch((err) => {
        console.error("Failed to fetch genders:", err);
      });
  };

  // Fetch Faculties and Statuses
  const fetchFacultiesAndStatuses = () => {
    fetch(`${baseUrl}/lecturers/statuses`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setStatuses(data);
      })
      .catch((err) => console.error("Failed to fetch lecturer statuses:", err));

    setFaculties(FACULTIES); // Example: Hardcoded faculties
  };

  const createLecturer = () => {
    fetch(`${baseUrl}/lecturers`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          navigate(-1);
        } else {
          response.json().then((data) => setError(data.error));
        }
      })
      .catch(() => {
        setError("Nepavyko sukurti dėstytojo.");
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createLecturer();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetchGenders();
    fetchFacultiesAndStatuses();
  }, []);

  return (
    <>
      <h1>Dėstytojo sukūrimas</h1>
      <Container>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormField
                controlId="name"
                label="Vardas"
                type="text"
                placeholder="Įrašykite vardą"
                value={formData.name}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <FormField
                controlId="surname"
                label="Pavardė"
                type="text"
                placeholder="Įrašykite pavardę"
                value={formData.surname}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                controlId="username"
                label="Vartotojo vardas"
                type="text"
                placeholder="Įrašykite vartotojo vardą"
                value={formData.username}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <FormField
                controlId="phone_number"
                label="Telefono nr."
                type="text"
                placeholder="Įrašykite telefono numerį"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                controlId="email"
                label="El. paštas"
                type="email"
                placeholder="Įrašykite El. paštą"
                value={formData.email}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Lytis</Form.Label>
                <Form.Select onChange={handleChange} value={formData.gender}>
                  <option>Pasirinkti...</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender.id}>
                      {gender.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                controlId="home_address"
                label="Adresas"
                type="text"
                placeholder="Įrašykite adresą"
                value={formData.home_address}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <FormField
                controlId="current_salary"
                label="Atlyginimas"
                type="number"
                placeholder="Įrašykite atlyginimą"
                value={formData.current_salary}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="status">
                <Form.Label>Statusas</Form.Label>
                <Form.Select onChange={handleChange} value={formData.status}>
                  <option>Pasirinkti...</option>
                  {statuses.map((status, index) => (
                    <option key={index} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="faculty">
                <Form.Label>Fakultetas</Form.Label>
                <Form.Select onChange={handleChange} value={formData.faculty}>
                  <option>Pasirinkti...</option>
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                controlId="picture_url"
                label="Nuotraukos URL"
                type="text"
                placeholder="Įrašykite nuotraukos URL"
                value={formData.picture_url}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button style={{ width: "100%" }} variant="primary" type="submit">
                Patvirtinti
              </Button>
            </Col>
            <Col>
              <Link to="/lecturers">
                <Button style={{ width: "100%" }} variant="secondary">
                  Grįžti į sąrašą
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default LecturerCreation;

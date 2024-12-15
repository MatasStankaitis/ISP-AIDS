import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../../components/FormField";
import { baseUrl } from "../../constants";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const StudentDetails = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [groups, setGroups] = useState([]);
  const [genders, setGenders] = useState([]);
  const [formState, setFormState] = useState({
    surname: "",
    name: "",
    fk_Facultyid: 0,
    fk_Groupid: 0,
    year: "",
    gender: 0,
    phone_number: "",
    email: "",
    home_address: "",
    state_funded: false,
  });

  function updateStudent() {
    const dataToSend = { ...formState } as any;
    dataToSend.username = undefined;
    return fetch(`${baseUrl}/students/${username}`, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          navigate("/home/students");
        } else {
          response.json().then((data) => {
            setError(data.error);
          });
        }
      })
      .catch((err) => {
        err;
      });
  }

  const fetchStudentDetails = () => {
    fetch(`${baseUrl}/students/${username}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFormState(data[0]);
      })
      .catch((error) => console.log(error));
  };

  const fetchGroups = () => {
    fetch(`${baseUrl}/groups`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchFaculties = () => {
    fetch(`${baseUrl}/faculties`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchGenders = () => {
    fetch(`${baseUrl}/genders`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGenders(data);
      })
      .catch((error) => console.log(error));
  };

  function handleSubmit(event: any) {
    event.preventDefault();
    updateStudent();
  }

  function handleChange(event: any) {
    const { id, value } = event.target;

    setFormState((p) => {
      const newState = { ...p, [id]: value };
      return newState;
    });
  }

  function handleCheckboxChange(event: any) {
    const { id, checked } = event.target;
    setFormState((p) => {
      const newState = { ...p, [id]: checked };
      return newState;
    });
  }

  useEffect(() => {
    fetchFaculties();
    fetchGenders();
    fetchGroups();
    fetchStudentDetails();
  }, []);

  return (
    <>
      {error ? (
        <Alert key={"danger"} variant={"danger"}>
          <center>{error}</center>
        </Alert>
      ) : null}
      <h1>Studento redagavimas</h1>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormField
                onChange={handleChange}
                value={formState.name}
                controlId="name"
                label="Vardas"
                type="text"
                placeholder="Įrašykite vardą"
              />
            </Col>
            <Col>
              <FormField
                onChange={handleChange}
                value={formState.surname}
                controlId="surname"
                label="Pavardė"
                type="text"
                placeholder="Įrašykite pavardę"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                onChange={handleChange}
                value={formState.phone_number}
                controlId="phone_number"
                label="Telefono nr."
                type="text"
                placeholder="Įrašykite telefono numerį"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                onChange={handleChange}
                value={formState.email}
                controlId="email"
                label="El. paštas"
                type="email"
                placeholder="Įrašykite El. paštą"
              />
            </Col>
            <Col>
              <FormField
                onChange={handleChange}
                value={formState.home_address}
                controlId="home_address"
                label="Gyvenamosios vietos adresas"
                type="text"
                placeholder="Įrašykite adresą"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="fk_Facultyid">
                <Form.Label>Fakultetas</Form.Label>
                <Form.Select
                  onInput={handleChange}
                  value={formState.fk_Facultyid}
                  required
                >
                  {faculties.map((f, i) => (
                    <option key={i} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="year">
                <Form.Label>Kursas</Form.Label>
                <Form.Select onInput={handleChange} value={formState.year}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Lytis</Form.Label>
                <Form.Select onInput={handleChange} value={formState.gender}>
                  {genders.map((f, i) => (
                    <option key={i} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="fk_Groupid">
                <Form.Label>Grupė</Form.Label>
                <Form.Select
                  onInput={handleChange}
                  value={formState.fk_Groupid}
                >
                  {groups.map((f, i) => (
                    <option key={i} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="state_funded">
                <Form.Label> </Form.Label>
                <Form.Check
                  inline
                  onChange={handleCheckboxChange}
                  checked={formState.state_funded}
                  label="Valstybės finansuojama"
                  name="group1"
                  type="checkbox"
                  id="state_funded"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button style={{ width: "100%" }} variant="primary" type="submit">
                Patvirtinti
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default StudentDetails;

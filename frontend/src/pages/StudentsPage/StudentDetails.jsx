import { Link, useParams } from "react-router-dom";
import STUDENTS from "../../prototypeData/students";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FACULTIES from "../../prototypeData/faculties";
import Container from "react-bootstrap/Container";

const StudentDetails = () => {
  const { vidko } = useParams();
  const user = STUDENTS.find((student) => student.vidko === vidko);

  return (
    <>
      <h1>Studento duomenys ({vidko})</h1>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Firstname">
                <Form.Label>Vardas</Form.Label>
                <Form.Control
                  required
                  defaultValue={user.name}
                  type="text"
                  placeholder="Įrašykite vardą"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="Firstname">
                <Form.Label>Pavardė</Form.Label>
                <Form.Control
                  required
                  defaultValue={user.surname}
                  type="text"
                  placeholder="Įrašykite pavardę"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Vartotojo vardas</Form.Label>
                <Form.Control
                  required
                  defaultValue={user.username}
                  type="text"
                  placeholder="Įrašykite vartotojo vardą"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="PhoneNumber">
                <Form.Label>Telefono nr.</Form.Label>
                <Form.Control
                  required
                  defaultValue={user.phoneNumber}
                  type="text"
                  placeholder="Įrašykite telefono numerį"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Email">
                <Form.Label>El. paštas</Form.Label>
                <Form.Control
                  required
                  defaultValue={user.email}
                  type="text"
                  placeholder="Įrašykite El. paštą"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="HomeAddress">
                <Form.Label>Gyvenamosios vietos adresas</Form.Label>
                <Form.Control
                  required
                  defaultValue={user.homeAddress}
                  type="text"
                  placeholder="Įrašykite adresą"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Faculty">
                <Form.Label>Fakultetas</Form.Label>
                <Form.Select defaultValue={user.faculty}>
                  {FACULTIES.map((f, i) => (
                    <option key={i} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="Year">
                <Form.Label>Kursas</Form.Label>
                <Form.Select defaultValue={user.year}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link to="/students">
                <Button
                  style={{ width: "100%" }}
                  variant="primary"
                  type="submit"
                >
                  Patvirtinti
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default StudentDetails;

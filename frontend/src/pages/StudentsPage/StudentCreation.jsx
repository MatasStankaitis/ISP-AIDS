import STUDENTS from "../../prototypeData/students";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FACULTIES from "../../prototypeData/faculties";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const StudentCreation = () => {
  return (
    <>
      <h1>Studento sukūrimas</h1>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Firstname">
                <Form.Label>Vardas</Form.Label>
                <Form.Control
                  required
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
                <Form.Select required>
                  <option>Pasirinkti...</option>
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
                <Form.Select>
                  <option>Pasirinkti...</option>
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

export default StudentCreation;

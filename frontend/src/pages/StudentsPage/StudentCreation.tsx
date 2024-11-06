import STUDENTS from "../../prototypeData/students";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FACULTIES from "../../prototypeData/faculties";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import FormField from "../../components/FormField";

const StudentCreation = () => {
  return (
    <>
      <h1>Studento sukūrimas</h1>
      <Container>
        <Form>
          <Row>
            <Col>
              <FormField
                controlId="Firstname"
                label="Vardas"
                type="text"
                placeholder="Įrašykite vardą"
              />
            </Col>
            <Col>
              <FormField
                controlId="Surname"
                label="Pavardė"
                type="text"
                placeholder="Įrašykite pavardę"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                controlId="Username"
                label="Vartotojo vardas"
                type="text"
                placeholder="Įrašykite vartotojo vardą"
              />
            </Col>
            <Col>
              <FormField
                controlId="PhoneNumber"
                label="Telefono nr."
                type="text"
                placeholder="Įrašykite telefono numerį"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                controlId="Email"
                label="El. paštas"
                type="text"
                placeholder="Įrašykite El. paštą"
              />
            </Col>
            <Col>
              <FormField
                controlId="HomeAddress"
                label="Gyvenamosios vietos adresas"
                type="text"
                placeholder="Įrašykite adresą"
              />
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
            <Col>
              <Form.Group className="mb-3" controlId="Gender">
                <Form.Label>Lytis</Form.Label>
                <Form.Select>
                  <option>Pasirinkti...</option>
                  <option value="1">Vyras</option>
                  <option value="2">Moteris</option>
                  <option value="3">Kita</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="AcademicGroup">
                <Form.Label>Lytis</Form.Label>
                <Form.Select>
                  <option>Pasirinkti...</option>
                  <option value="1">IFF-2/5</option>
                  <option value="2">IFF-2/6</option>
                  <option value="3">IFF-2/7</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="IsStateFunded">
                <Form.Label> </Form.Label>
                <Form.Check
                  inline
                  label="Valstybės finansuojama"
                  name="group1"
                  type="checkbox"
                  id="IsStateFunded"
                />
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

import STUDENTS from "../../prototypeData/students";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FACULTIES from "../../prototypeData/faculties";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import FormField from "../../components/FormField";

const LecturerCreation = () => {
  return (
    <>
      <h1>Dėstytojo sukūrimas</h1>
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
                controlId="status"
                label="Statusas"
                type="text"
                placeholder="Įrašykite dėstytojo statusą"
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
          </Row>
          <Row>
          <Col>
              <FormField
                controlId="Adress"
                label="Adresas"
                type="text"
                placeholder="Įrašykite adresą"
              />
            </Col>
            <Col>
            <FormField
                controlId="salary"
                label="Atlyginimas"
                type="text"
                placeholder="Įrašykite atlyginimą"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                  controlId="PictureUrl"
                  label="Nuotraukos URL"
                  type="text"
                  placeholder="Įrašykite nuotraukos URL"
                />
            </Col>
          </Row>

          <Row>
            <Col>
              <Link to="/lecturers">
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

export default LecturerCreation;
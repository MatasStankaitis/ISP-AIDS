import { Link, useParams } from "react-router-dom";
import STUDENTS from "../../prototypeData/students";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FACULTIES from "../../prototypeData/faculties";
import Container from "react-bootstrap/Container";
import FormField from "../../components/FormField";

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
              <FormField
                ControlId="Firstname"
                label="Vardas"
                type="text"
                placeholder="Įrašykite vardą"
                defaultValue={user.name}
              />
            </Col>
            <Col>
              <FormField
                ControlId="Surname"
                label="Pavardė"
                type="text"
                placeholder="Įrašykite pavardę"
                defaultValue={user.surname}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                ControlId="Username"
                label="Vartotojo vardas"
                type="text"
                placeholder="Įrašykite vartotojo vardą"
                defaultValue={user.username}
              />
            </Col>
            <Col>
              <FormField
                ControlId="PhoneNumber"
                label="Telefono nr."
                type="text"
                placeholder="Įrašykite telefono numerį"
                defaultValue={user.phoneNumber}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormField
                ControlId="Email"
                label="El. paštas"
                type="text"
                placeholder="Įrašykite El. paštą"
                defaultValue={user.email}
              />
            </Col>
            <Col>
              <FormField
                ControlId="HomeAddress"
                label="Gyvenamosios vietos adresas"
                type="text"
                placeholder="Įrašykite adresą"
                defaultValue={user.homeAddress}
              />
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
            <Col>
              <Form.Group className="mb-3" controlId="Gender">
                <Form.Label>Lytis</Form.Label>
                <Form.Select defaultValue={user.gender}>
                  <option value="1">Vyras</option>
                  <option value="2">Moteris</option>
                  <option value="3">Kita</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="AcademicGroup">
                <Form.Label>Grupė</Form.Label>
                <Form.Select defaultValue={user.academicGroup}>
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
                  defaultChecked={user.isStateFunded}
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

export default StudentDetails;

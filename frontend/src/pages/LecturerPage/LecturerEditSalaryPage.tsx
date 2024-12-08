import { useParams, useNavigate } from "react-router-dom";
import LECTURERS from "../../prototypeData/lecturers";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LecturerEditSalaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecturer = LECTURERS.find((lect) => lect.id === Number(id));

  const handleSave = () => {
    console.log("Mock saving salary data"); // Placeholder for saving logic
    navigate(`/lecturers/${id}`);
  };

  if (!lecturer) {
    return <p>Dėstytojas nerastas.</p>;
  }

  return (
    <Container>
      <h1>Redaguoti atlyginimą</h1>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Dabartinis atlyginimas</Form.Label>
              <Form.Control defaultValue={`€${lecturer.salary}`} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button style={{ width: "100%" }} variant="primary" onClick={handleSave}>
              Išsaugoti
            </Button>
          </Col>
          <Col>
            <Button style={{ width: "100%" }} variant="warning" onClick={() => {}}>
              Taikyti bonusą
            </Button>
          </Col>
          <Col>
            <Button style={{ width: "100%" }} variant="secondary" onClick={() => navigate(`/home/lecturers/${id}`)}>
              Grįžti į profilį
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LecturerEditSalaryPage;

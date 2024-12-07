import { useParams, useNavigate } from "react-router-dom";
import LECTURERS from "../../prototypeData/lecturers";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LecturerEditSalaryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecturer = LECTURERS.find((lect) => lect.id === Number(id));

  const handleSave = () => {
    console.log("Mock saving salary data"); // Placeholder for saving logic
    navigate(`/lecturers/${id}`);
  };

  return (
    <Container>
      <h1>Redaguoti atlyginimą</h1>
      <Form>
        <Form.Group>
          <Form.Label>Dabartinis atlyginimas</Form.Label>
          <Form.Control defaultValue={`$${lecturer?.salary || "0.00"}`} />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Išsaugoti
        </Button>
      </Form>
    </Container>
  );
};

export default LecturerEditSalaryPage;

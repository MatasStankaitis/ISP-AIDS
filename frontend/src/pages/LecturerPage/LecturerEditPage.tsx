import { useParams, useNavigate } from "react-router-dom";
import LECTURERS from "../../prototypeData/lecturers";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LecturerEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const lecturer = LECTURERS.find((lect) => lect.id === Number(id));

  const handleSave = () => {
    console.log("Mock saving lecturer data"); // Placeholder for saving logic
    navigate(`/lecturers/${id}`);
  };

  return (
    <Container>
      <h1>Edit Lecturer Data</h1>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control defaultValue={lecturer?.name} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Control defaultValue={lecturer?.department} />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default LecturerEditPage;

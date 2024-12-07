import { Link, useParams } from "react-router-dom";
import LECTURERS from "../../prototypeData/lecturers";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const LecturerDetails = () => {
  const { id } = useParams();
  const lecturer = LECTURERS.find((lect) => lect.id === Number(id));

  return (
    <Container>
      <h1>Lecturer Profile</h1>
      <p><strong>Name:</strong> {lecturer?.name}</p>
      <p><strong>Department:</strong> {lecturer?.department}</p>
      <div>
        <Link to="/lecturers">
          <Button variant="secondary">Back to Lecturer List</Button> {/* New Button */}
        </Link>
        <Link to={`/lecturers/${id}/edit`}>
          <Button variant="primary">Edit Data</Button>
        </Link>
        <Link to={`/lecturers/${id}/edit-salary`}>
          <Button variant="warning">Edit Salary</Button> {/* New Button */}
        </Link>
      </div>
    </Container>
  );
};

export default LecturerDetails;

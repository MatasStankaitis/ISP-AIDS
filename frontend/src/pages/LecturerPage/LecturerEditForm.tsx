import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const LecturerEditForm = () => {
  const { id } = useParams();

  return (
    <Container>
      <h1>Edit Lecturer</h1>
        <Link to={`/lecturers/${id}/edit`}>
            <Button variant="primary">Edit Data</Button>
        </Link>
      <Link to={"/lecturers/" + id + "/edit/salary"}>
        <Button variant="secondary">Edit Salary</Button>
      </Link>
      <Button variant="danger">Remove Lecturer</Button>
    </Container>
  );
};

export default LecturerEditForm;
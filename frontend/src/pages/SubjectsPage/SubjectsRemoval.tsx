import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const SubjectsRemoval = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = () => {
    fetch(`${baseUrl}/subjects`)
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  const handleDelete = (code) => {
    fetch(`${baseUrl}/subjects/${code}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => fetchSubjects())
      .catch((error) => console.error("Error deleting subject:", error));
  };

  return (
    <Container>
      <h1>Remove Subjects</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Language</th>
            <th>Remote</th>
            <th>Faculty ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.code}>
              <td>{subject.code}</td>
              <td>{subject.name}</td>
              <td>{subject.credits}</td>
              <td>{subject.language}</td>
              <td>{subject.is_remote ? "Yes" : "No"}</td>
              <td>{subject.fk_Facultyid}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(subject.code)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SubjectsRemoval;

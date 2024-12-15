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
      <h1>Modulių naikinimas</h1>
      <Button variant="secondary" onClick={() => navigate("/home/subjects")}>
        Atgal į modulių sąrašą
      </Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Kodas</th>
            <th>Pavadinimas</th>
            <th>Kreditų sk.</th>
            <th>Kalba</th>
            <th>Nuotoliu</th>
            <th>Fakultetas</th>
            <th>Veiksmai</th>
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
                  Ištrinti
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
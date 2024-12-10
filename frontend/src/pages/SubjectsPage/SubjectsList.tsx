import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SubjectDataTableRow from "./components/SubjectDataTableRow";
import SubjectDataTable from "./components/SubjectDataTable";
import FiltersDiv from "./components/FiltersDiv";
import { baseUrl } from "../../constants";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SubjectsList = () => {
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState({});

  useEffect(() => {
    fetchSubjects();
    fetchFaculties();
  }, []);

  const fetchSubjects = () => {
    fetch(`${baseUrl}/subjects`)
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  const fetchFaculties = () => {
    fetch(`${baseUrl}/faculties`)
      .then((response) => response.json())
      .then((data) => {
        const facultiesMap = data.reduce((acc, faculty) => {
          acc[faculty.id] = faculty.name;
          return acc;
        }, {});
        setFaculties(facultiesMap);
      })
      .catch((error) => console.error("Error fetching faculties:", error));
  };

  const onChange = (e) => {
    if (e.target.id === "nameInput") {
      setName(e.target.value);
    }
  };

  return (
    <Container className="subjects-list-container">
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <Link to={"/home/subjects/create"}>
            <Button variant="primary" className="mx-2">Pridėti modulį</Button>
          </Link>
          <Link to={"/home/subjects/remove"}>
            <Button variant="danger" className="mx-2">Panaikinti modulius</Button>
          </Link>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <FiltersDiv name={name} onChange={onChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SubjectDataTable
            rows={
              <>
                {subjects
                  .filter((subject) =>
                    subject.name.toUpperCase().startsWith(name.toUpperCase())
                  )
                  .map((subject, i) => (
                    <SubjectDataTableRow
                      key={i}
                      {...subject}
                      facultyName={faculties[subject.fk_Facultyid]}
                    />
                  ))}
              </>
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SubjectsList;
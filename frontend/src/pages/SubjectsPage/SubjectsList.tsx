import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SubjectDataTableRow from "./components/SubjectDataTableRow";
import SubjectDataTable from "./components/SubjectDataTable";
import FiltersDiv from "./components/FiltersDiv";
import { baseUrl } from "../../constants";

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
    <>
      <div className="flex-container">
        <Link to={"/home/subjects/create"}>
          <Button variant="primary">Add Subject</Button>
        </Link>
        <Link to={"/home/subjects/remove"}>
          <Button variant="primary">Remove Subjects</Button>
        </Link>
      </div>
      <FiltersDiv name={name} onChange={onChange} />
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
    </>
  );
};

export default SubjectsList;
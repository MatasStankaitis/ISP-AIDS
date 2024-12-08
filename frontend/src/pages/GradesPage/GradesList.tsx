import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import FiltersDiv from "./components/FiltersDiv";
import { Button } from "react-bootstrap";
import { baseUrl } from "../../constants"; // Assuming `baseUrl` is defined for API calls

const GradesList = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const { subjectCode } = useParams(); // Get subject code from URL params

  // Fetch students by subject code
  useEffect(() => {
    if (subjectCode) {
      fetchStudentsBySubject(subjectCode);
    }
  }, [subjectCode]);

  const fetchStudentsBySubject = (code) => {
    fetch(`${baseUrl}/subjects/${code}/students`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data); // Assuming the response contains students and their grades
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  const onChange = (e) => {
    switch (e.target.id) {
      case "firstnameInput":
        setName(e.target.value);
        break;
      case "surnameInput":
        setSurname(e.target.value);
        break;
      default:
        break;
    }
  };

  const addGradeHandler = (studentId) => {
    navigate(`/grades/add/${studentId}`);
  };

  const editGradesHandler = (studentId) => {
    navigate(`/grades/edit/${studentId}`);
  };

  const viewGradesHandler = (studentId) => {
    navigate(`/grades/view/${studentId}`);
  };

  return (
    <>
      <FiltersDiv name={name} surname={surname} onChange={onChange} />
      <StudentDataTable
        rows={
          <>
            {students
              .filter(
                (student) =>
                  student.name.toUpperCase().startsWith(name.toUpperCase()) &&
                  student.surname.toUpperCase().startsWith(surname.toUpperCase())
              )
              .map((student) => (
                <StudentDataTableRow
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  surname={student.surname}
                  addGradeButton={
                    <Button onClick={() => addGradeHandler(student.id)}>
                      Add Grade
                    </Button>
                  }
                  editGradesButton={
                    <Button onClick={() => editGradesHandler(student.id)}>
                      Edit Grades
                    </Button>
                  }
                  viewGradesButton={
                    <Button onClick={() => viewGradesHandler(student.id)}>
                      View Report
                    </Button>
                  }
                />
              ))}
          </>
        }
      />
    </>
  );
};

export default GradesList;

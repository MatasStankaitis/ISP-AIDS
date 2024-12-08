import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import STUDENTS from "../../prototypeData/students";
import { useState, useEffect } from "react";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants";

const GradesList = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const navigate = useNavigate();

  const { subjectCode } = useParams();

  const onChange = (e) => {
    switch (e.target.id) {
      case "firstnameInput":
        setName(e.target.value);
        break;
      case "surnameInput":
        setSurname(e.target.value);
    }
  };

  const addGradeHandler = (username: string) => {
    navigate(`/grades/${subjectCode}/students/${username}/create`);
  };

  const editGradesHandler = (username: string) => {
    navigate(`/grades/${subjectCode}/students/${username}/edit`);
  };

  const viewGradesHandler = (studentId) => {
    navigate(`/grades/view/${studentId}`);
  };

  const [students, setStudents] = useState([] as listStudent[]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch(`${baseUrl}/grades/${subjectCode}/students`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <FiltersDiv onFilter={setStudents} />
      <StudentDataTable
        rows={
          <>
            {students.map((student, i) => {
              student.id = i + 1;
              return (
                <StudentDataTableRow
                  key={i}
                  {...student}
                  addGradeButton={
                    <Button onClick={() => addGradeHandler(student.username)}>
                      Pridėti pažymį
                    </Button>
                  }
                  editGradesButton={
                    <Button onClick={() => editGradesHandler(student.username)}>
                      Peržiūrėti pažymius
                    </Button>
                  }
                  viewGradesButton={
                    <Button onClick={() => viewGradesHandler(student.username)}>
                      Ataskaita
                    </Button>
                  }
                />
              );
            })}
          </>
        }
      />
    </>
  );
};

export default GradesList;

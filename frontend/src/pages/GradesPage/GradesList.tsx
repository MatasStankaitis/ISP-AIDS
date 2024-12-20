﻿import StudentDataTableRow from "./components/StudentDataTableRow";
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
    navigate(`/home/grades/${subjectCode}/students/${username}/create`);
  };

  const editGradesHandler = (username: string) => {
    navigate(`/home/grades/${subjectCode}/students/${username}/edit`);
  };

  const viewGradesHandler = (username: string) => {
    navigate(`/home/grades/${subjectCode}/students/${username}/report`);
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
  const handleSubmit = () => {
    navigate(`/home/subjects`);
  };

  return (
    <>
      <FiltersDiv onFilter={setStudents} subjectCode={subjectCode} />
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
                      Redaguoti pažymius
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
      <Button variant="primary" onClick={handleSubmit}>
        Grįžti atgal
      </Button>
    </>
  );
};

export default GradesList;

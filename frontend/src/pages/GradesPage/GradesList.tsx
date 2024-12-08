import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import STUDENTS from "../../prototypeData/students";
import { useState, useEffect } from "react";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants";


const GradesList = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        switch (e.target.id) {
            case "firstnameInput":
                setName(e.target.value);
                break;
            case "surnameInput":
                setSurname(e.target.value);
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

    const [students, setStudents] = useState([] as listStudent[]);

    useEffect(() => {
      getStudents();
    }, []);

    const getStudents = () => {
      fetch(`${baseUrl}/grades/CS101/students`, {
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
            <FiltersDiv name={name} surname={surname} onChange={onChange} />
            <StudentDataTable
                rows={
                    <>
                        {STUDENTS.filter(
                            (student) =>
                                student.name.toUpperCase().startsWith(name.toUpperCase()) &&
                                student.surname.toUpperCase().startsWith(surname.toUpperCase())
                        ).map((student, i) => {
                            student.id = i + 1;
                            return (
                                <StudentDataTableRow
                                    key={i}
                                    {...student}
                                    addGradeButton={<Button onClick={() => addGradeHandler(student.id)}>Pridėti pažymį</Button>}
                                    editGradesButton={<Button onClick={() => editGradesHandler(student.id)}>Peržiūrėti pažymius</Button>}
                                    viewGradesButton={<Button onClick={() => viewGradesHandler(student.id)}>Ataskaita</Button>}
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

import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import STUDENTS from "../../prototypeData/students";
import { useState } from "react";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const StudentsList = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const onChange = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case "firstnameInput":
        setName(e.target.value);
        break;
      case "surnameInput":
        setSurname(e.target.value);
    }
  };

  return (
    <>
      <div className="flex-container">
        <Button variant="primary">Exportuoti</Button>
        <Link to={"/students/create"}>
          <Button variant="primary">Pridėti studentą</Button>
        </Link>
      </div>
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
              return <StudentDataTableRow key={i} {...student} />;
            })}
          </>
        }
      />
    </>
  );
};

export default StudentsList;

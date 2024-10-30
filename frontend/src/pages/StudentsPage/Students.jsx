import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import STUDENTS from "../../prototypeData/students";
import { useState } from "react";
import FiltersDiv from "./components/FiltersDiv";

const Students = () => {
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
              return <StudentDataTableRow {...student} />;
            })}
          </>
        }
      />
    </>
  );
};

export default Students;

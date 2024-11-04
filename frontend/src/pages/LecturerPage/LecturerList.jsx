import LecturerDataTableRow from "./components/LecturerDataTableRow";
import LecturerDataTable from "./components/LecturerDataTable";
import LECTURERS from "../../prototypeData/lecturers";
import { useState } from "react";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LecturerList = () => {
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
          <Button variant="primary">Pridėti Dėstytoją</Button>
        </Link>
      </div>
      <FiltersDiv name={name} surname={surname} onChange={onChange} />
      <LecturerDataTable
        rows={
          <>
            {LECTURERS.filter(
              (lecturer) =>
                lecturer.name.toUpperCase().startsWith(name.toUpperCase()) &&
                lecturer.surname.toUpperCase().startsWith(surname.toUpperCase())
            ).map((lecturer, i) => {
              lecturer.id = i + 1;
              return <LecturerDataTableRow key={i} {...lecturer} />;
            })}
          </>
        }
      />
    </>
  );
};

export default LecturerList;

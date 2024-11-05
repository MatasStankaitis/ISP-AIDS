import SubjectDataTableRow from "./components/SubjectDataTableRow";
import SubjectDataTable from "./components/SubjectDataTable";
import SUBJECTS from "../../prototypeData/subjects";
import { useState } from "react";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const SubjectsList = () => {
  const [name, setName] = useState("");

  const onChange = (e) => {
    if (e.target.id === "nameInput") {
      setName(e.target.value);
    }
  };

  return (
    <>
      <div className="flex-container">
        <Link to={"/subjects/create"}>
          <Button variant="primary">Add Subject</Button>
        </Link>
        <Link to={"/subjects/remove"}>
          <Button variant="primary">Remove Subjects</Button>
        </Link>
      </div>
      <FiltersDiv name={name} onChange={onChange} />
      <SubjectDataTable
        rows={
          <>
            {SUBJECTS.filter((subject) =>
              subject.name.toUpperCase().startsWith(name.toUpperCase())
            ).map((subject, i) => (
              <SubjectDataTableRow key={i} {...subject} />
            ))}
          </>
        }
      />
    </>
  );
};

export default SubjectsList;

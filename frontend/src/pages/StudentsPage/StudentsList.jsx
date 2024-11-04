import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import STUDENTS from "../../prototypeData/students";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const StudentsList = () => {
  return (
    <>
      <div className="flex-container">
        <Button variant="primary">Exportuoti</Button>
        <Link to={"/students/create"}>
          <Button variant="primary">Pridėti studentą</Button>
        </Link>
      </div>
      <FiltersDiv />
      <StudentDataTable
        rows={
          <>
            {STUDENTS.map((student, i) => {
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

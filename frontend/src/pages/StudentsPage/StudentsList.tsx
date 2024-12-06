import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import STUDENTS from "../../prototypeData/students";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import RemoveModal from "./components/RemoveModal";
import ExportModal from "./components/ExportModal";

const StudentsList = () => {
  const [removeModalShow, setRemoveModalShow] = useState({
    shouldShow: false,
    studentName: "",
  });
  const [exportModalShow, setExportModalShow] = useState(false);

  function handleRemoveStudent(name: string) {
    setRemoveModalShow({ shouldShow: true, studentName: name });
  }

  return (
    <>
      <div className="flex-container">
        <Button onClick={() => setExportModalShow(true)} variant="primary">
          Exportuoti
        </Button>
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
              return (
                <StudentDataTableRow
                  key={i}
                  onRemove={handleRemoveStudent}
                  {...student}
                />
              );
            })}
          </>
        }
      />
      <ExportModal
        show={exportModalShow}
        onHide={() => setExportModalShow(false)}
      />
      <RemoveModal
        name={removeModalShow.studentName}
        show={removeModalShow.shouldShow}
        onHide={() =>
          setRemoveModalShow({
            shouldShow: false,
            studentName: "",
          })
        }
      />
    </>
  );
};

export default StudentsList;

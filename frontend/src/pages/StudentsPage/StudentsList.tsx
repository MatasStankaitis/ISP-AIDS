import StudentDataTableRow from "./components/StudentDataTableRow";
import StudentDataTable from "./components/StudentDataTable";
import STUDENTS from "../../prototypeData/students";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RemoveModal from "./components/RemoveModal";
import ExportModal from "./components/ExportModal";
import { listStudent } from "../../types/listStudent";
import { baseUrl } from "../../constants";

const StudentsList = () => {
  const [removeModalShow, setRemoveModalShow] = useState({
    shouldShow: false,
    studentName: "",
  });
  const [exportModalShow, setExportModalShow] = useState(false);

  const [students, setStudents] = useState([] as listStudent[]);

  useEffect(() => {
    fetch(`${baseUrl}/students`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => console.log(error));
  }, []);

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
      <FiltersDiv onFilter={setStudents} />
      <StudentDataTable
        rows={
          <>
            {students.map((student, i) => {
              return (
                <StudentDataTableRow
                  key={student.username}
                  onRemove={handleRemoveStudent}
                  id={i + 1}
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

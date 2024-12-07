import LecturerDataTableRow from "./components/LecturerDataTableRow";
import LecturerDataTable from "./components/LecturerDataTable";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import LecturerRemoveModal from "./components/LecturerRemoveModal";
import LECTURERS from "../../prototypeData/lecturers";

const LecturerList = () => {
  const [removeModalShow, setRemoveModalShow] = useState({
    shouldShow: false,
    lecturerName: "",
  });

  function handleRemoveLecturer(name: string) {
    console.log("Removing lecturer:", name);
    setRemoveModalShow({ shouldShow: true, lecturerName: name });
  }

  console.log("Rendering LecturerList");

  return (
    <>
      <div className="flex-container">
        <Link to={"/lecturers/create"}>
          <Button variant="primary">Add Lecturer</Button>
        </Link>
      </div>
      <FiltersDiv />
      <LecturerDataTable
        rows={LECTURERS.map((lecturer, i) => (
          <LecturerDataTableRow
            key={i}
            id={lecturer.id}
            name={lecturer.name}
            department={lecturer.department}
            onRemove={handleRemoveLecturer}
          />
        ))}
      />
      <LecturerRemoveModal
        name={removeModalShow.lecturerName}
        show={removeModalShow.shouldShow}
        onHide={() =>
          setRemoveModalShow({
            shouldShow: false,
            lecturerName: "",
          })
        }
      />
    </>
  );
};

export default LecturerList;
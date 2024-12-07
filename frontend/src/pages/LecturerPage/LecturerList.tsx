import LecturerDataTableRow from "./components/LecturerDataTableRow";
import LecturerDataTable from "./components/LecturerDataTable";
import LECTURERS from "../../prototypeData/lecturers";
import FiltersDiv from "./components/FiltersDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import LecturerRemoveModal from "./components/LecturerRemoveModal";

const LecturerList = () => {
  const [removeModalShow, setRemoveModalShow] = useState({
    shouldShow: false,
    lecturerName: "",
  });

  function handleRemoveLecturer(name: string) {
    setRemoveModalShow({ shouldShow: true, lecturerName: name });
  }

  return (
    <>
      <div className="flex-container">
        <Link to={"/lecturers/create"}>
          <Button variant="primary">Pridėti dėstytoją</Button>
        </Link>
      </div>
      <LecturerDataTable
        rows={LECTURERS.map((lecturer, i) => (
          <LecturerDataTableRow
            key={lecturer.id}
            {...lecturer}
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

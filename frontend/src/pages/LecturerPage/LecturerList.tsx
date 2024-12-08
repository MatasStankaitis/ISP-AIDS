import React, { useState } from "react";
import LecturerDataTable from "./components/LecturerDataTable";
import LecturerDataTableRow from "./components/LecturerDataTableRow";
import LecturerFilterDiv from "./components/LecturerFilterDiv";
import LECTURERS from "../../prototypeData/lecturers";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const LecturerList = () => {
  const [filteredLecturers, setFilteredLecturers] = useState(LECTURERS);
  const [removeModal, setRemoveModal] = useState({
    show: false,
    lecturerName: "",
  });

  const handleFilter = (searchText: string) => {
    const lowerCaseSearch = searchText.toLowerCase();
    const filtered = LECTURERS.filter(
      (lecturer) =>
        lecturer.name.toLowerCase().includes(lowerCaseSearch) ||
        lecturer.surname.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredLecturers(filtered);
  };

  const handleRemoveClick = (name: string) => {
    setRemoveModal({ show: true, lecturerName: name });
  };

  const handleConfirmRemove = () => {
    console.log(`Pašalinti dėstytoją: ${removeModal.lecturerName}`);
    setRemoveModal({ show: false, lecturerName: "" });
    // Additional logic to remove the lecturer from the list can be added here.
  };

  return (
    <>
      <div className="flex-container">
        <Link to="/home/lecturers/create">
          <Button variant="primary">Pridėti dėstytoją</Button>
        </Link>
      </div>
      <LecturerFilterDiv onFilter={handleFilter} />
      <LecturerDataTable
        rows={filteredLecturers.map((lecturer) => (
          <LecturerDataTableRow
            key={lecturer.id}
            {...lecturer}
            onRemove={handleRemoveClick}
          />
        ))}
      />

      {/* Confirmation Modal */}
      <Modal
        show={removeModal.show}
        onHide={() => setRemoveModal({ show: false, lecturerName: "" })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Patvirtinimas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ar tikrai norite pašalinti dėstytoją "{removeModal.lecturerName}"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setRemoveModal({ show: false, lecturerName: "" })}
          >
            Atšaukti
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            Pašalinti
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LecturerList;

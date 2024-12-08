import React, { useEffect, useState } from "react";
import LecturerDataTable from "./components/LecturerDataTable";
import LecturerDataTableRow from "./components/LecturerDataTableRow";
import LecturerFilterDiv from "./components/LecturerFilterDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from "../../constants";

const LecturerList = () => {
  const [lecturers, setLecturers] = useState([]);
  const [genders, setGenders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [removeModal, setRemoveModal] = useState({
    show: false,
    lecturerName: "",
  });

  useEffect(() => {
    fetchLecturers();
    fetchGenders();
    fetchStatuses();
    fetchFaculties();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await fetch(`${baseUrl}/lecturers`);
      const data = await response.json();
      console.log("Fetched lecturers:", data); // Log lecturers data
      setLecturers(data);
    } catch (error) {
      console.error("Failed to fetch lecturers:", error);
    }
  };


  const fetchGenders = async () => {
    try {
      const response = await fetch(`${baseUrl}/genders`);
      const data = await response.json();
      console.log("Fetched genders:", data); // Add this
      setGenders(data);
    } catch (error) {
      console.error("Failed to fetch genders:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await fetch(`${baseUrl}/lecturers/statuses`);
      const data = await response.json();
      setStatuses(data);
    } catch (error) {
      console.error("Failed to fetch statuses:", error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await fetch(`${baseUrl}/faculties`);
      const data = await response.json();
      console.log("Fetched faculties:", data); // Add this
      setFaculties(data);
    } catch (error) {
      console.error("Failed to fetch faculties:", error);
    }
  };

  const getReadableGender = (genderId: number) => {
    console.log("Gender ID:", genderId, "Available genders:", genders); // Debug log
    return genders.find((g: any) => g.id === genderId)?.name || "N/A";
  };

  const getReadableStatus = (statusId: number) =>
    statuses.find((s: any) => s.id === statusId)?.name || "N/A";

  const getReadableFaculty = (facultyId: number) => {
    console.log("Faculty ID:", facultyId, "Available faculties:", faculties); // Debug log
    return faculties.find((f: any) => f.id === facultyId)?.name || "N/A";
  };

  const handleRemoveClick = (name: string) => {
    setRemoveModal({ show: true, lecturerName: name });
  };

  const handleConfirmRemove = () => {
    console.log(`Pašalinti dėstytoją: ${removeModal.lecturerName}`);
    setRemoveModal({ show: false, lecturerName: "" });
  };

  return (
    <>
      <div className="flex-container">
        <Link to="/lecturers/create">
          <Button variant="primary">Pridėti dėstytoją</Button>
        </Link>
      </div>
      <LecturerFilterDiv />
      <LecturerDataTable
        rows={lecturers.map((lecturer, index) => (
          <LecturerDataTableRow
            key={lecturer.username}
            id={index + 1}
            name={lecturer.name}
            surname={lecturer.surname}
            username={lecturer.username}
            phone_number={lecturer.phone_number}
            email={lecturer.email}
            home_address={lecturer.home_address}
            gender={getReadableGender(lecturer.gender)} // Ensure proper mapping
            status={getReadableStatus(lecturer.status)}
            faculty={getReadableFaculty(lecturer.faculty)} // Ensure proper mapping
            current_salary={lecturer.current_salary}
            onRemove={handleRemoveClick}
          />
        ))}
      />

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

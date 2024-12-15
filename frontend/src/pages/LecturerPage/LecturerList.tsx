import React, { useEffect, useState } from "react";
import LecturerDataTable from "./components/LecturerDataTable";
import LecturerDataTableRow from "./components/LecturerDataTableRow";
import LecturerFilterDiv from "./components/LecturerFilterDiv";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from "../../constants";

interface Lecturer {
  name: string;
  surname: string;
  username: string;
  phone_number: string;
  email: string;
  home_address: string;
  gender_name: string;
  status_name: string;
  faculty_name: string;
  current_salary: number;
}

const LecturerList = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [filteredLecturers, setFilteredLecturers] = useState<Lecturer[]>([]);
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
      setLecturers(data);
      setFilteredLecturers(data);
    } catch (error) {
      console.error("Failed to fetch lecturers:", error);
    }
  };

  const fetchGenders = async () => {
    try {
      const response = await fetch(`${baseUrl}/genders`);
      const data = await response.json();
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
      setFaculties(data);
    } catch (error) {
      console.error("Failed to fetch faculties:", error);
    }
  };

  const handleFilter = (searchText: string) => {
    const lowerCaseSearch = searchText.toLowerCase();
    const filtered = lecturers.filter(
      (lecturer) =>
        lecturer.name.toLowerCase().includes(lowerCaseSearch) ||
        lecturer.surname.toLowerCase().includes(lowerCaseSearch) ||
        (lecturer.username &&
          lecturer.username.toLowerCase().includes(lowerCaseSearch))
    );
    setFilteredLecturers(filtered);
  };

  const handleRemoveClick = (username: string) => {
    console.log("user to remove: ", username);
    setRemoveModal({ show: true, lecturerName: username });
  };

  const handleConfirmRemove = async () => {
    try {
      const response = await fetch(`${baseUrl}/lecturers/${removeModal.lecturerName}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLecturers((prev) =>
          prev.filter((lect) => lect.username !== removeModal.lecturerName)
        );
        setFilteredLecturers((prev) =>
          prev.filter((lect) => lect.username !== removeModal.lecturerName)
        );
        setRemoveModal({ show: false, lecturerName: "" });
      } else {
        console.error("Failed to remove lecturer");
      }
    } catch (error) {
      console.error("Error removing lecturer:", error);
    }
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
        rows={filteredLecturers.map((lecturer, index) => (
          <LecturerDataTableRow
            key={lecturer.username}
            id={index + 1}
            name={lecturer.name}
            surname={lecturer.surname}
            username={lecturer.username}
            phone_number={lecturer.phone_number}
            email={lecturer.email}
            home_address={lecturer.home_address}
            gender={lecturer.gender_name}
            status={lecturer.status_name}
            faculty={lecturer.faculty_name}
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

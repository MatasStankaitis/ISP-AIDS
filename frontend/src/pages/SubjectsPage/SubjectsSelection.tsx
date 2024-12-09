import React, { useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../../context/AuthContext";
import { baseUrl } from "../../constants";
import StudentSubjectsTableRow from "./components/StudentSubjectsTableRow";
import AvailableSubjectsModal from "./components/AvailableSubjectsModal";
import { useNavigate } from "react-router-dom";

interface Subject {
  id: number;
  subject_code: string;
  subject_name: string;
  passed: boolean;
  subject_time_id: number;
}

const SubjectsSelection = () => {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username) {
      fetch(`${baseUrl}/subjects/student-subjects/${user.username}`)
        .then((response) => response.json())
        .then((data) => setSubjects(data))
        .catch((error) => console.error("Error fetching student subjects:", error));
    }
  }, [user?.username]);

  const handleDelete = (id: number) => {
    fetch(`${baseUrl}/subjects/student-subjects/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setSubjects(subjects.filter((subject) => subject.id !== id));
        } else {
          console.error("Failed to delete student subject");
        }
      })
      .catch((error) => console.error("Error deleting student subject:", error));
  };

  const handleViewGrades = (code: string) => {
    navigate(`/home/grades/${code}/students/${user.username}/mygrades`);
  };

  const handleRegister = (newSubject: Subject) => {
    setSubjects((prevSubjects) => [
      ...prevSubjects,
      {
        id: newSubject.id,
        subject_code: newSubject.code,
        subject_name: newSubject.name,
        passed: newSubject.passed,
        subject_time_id: newSubject.subject_time_id,
      },
    ]);
  };

  return (
    <div className="table-responsive">
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Passed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <StudentSubjectsTableRow
              key={subject.id}
              id={subject.id}
              subject_code={subject.subject_code}
              subject_name={subject.subject_name}
              passed={subject.passed}
              onDelete={handleDelete}
              onViewGrades={handleViewGrades}
            />
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        See All Available Subjects
      </Button>
      <AvailableSubjectsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedSubjects={subjects.map((subject) => subject.subject_code)}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default SubjectsSelection;
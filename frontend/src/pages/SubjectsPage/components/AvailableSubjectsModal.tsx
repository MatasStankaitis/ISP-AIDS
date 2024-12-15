import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { baseUrl } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";

interface AvailableSubjectsModalProps {
  show: boolean;
  onHide: () => void;
  selectedSubjects: string[];
  onRegister: (newSubject: Subject) => void;
}

interface Subject {
  code: string;
  name: string;
  credits: number;
  description: string;
  language: string;
  is_remote: boolean;
  fk_Facultyid: number;
}

interface SubjectTime {
  id: number;
  hour: number;
  day: number;
  classroom: string;
  capacity: number;
  even_week: boolean;
  registered_students: number;
}

const dayMapping = {
  1: "Pirmadienis",
  2: "Antradienis",
  3: "Trečiadienis",
  4: "Ketvirtadienis",
  5: "Penktadienis",
  6: "Šeštadienis",
  7: "Sekmadienis",
};

const AvailableSubjectsModal = ({ show, onHide, selectedSubjects, onRegister }: AvailableSubjectsModalProps) => {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [faculties, setFaculties] = useState<{ [key: number]: string }>({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (show) {
      fetch(`${baseUrl}/subjects`)
        .then((response) => response.json())
        .then((data) => {
          const filteredSubjects = data.filter(
            (subject: Subject) => !selectedSubjects.includes(subject.code)
          );
          setSubjects(filteredSubjects);
        })
        .catch((error) => console.error("Error fetching subjects:", error));

      fetch(`${baseUrl}/faculties`)
        .then((response) => response.json())
        .then((data) => {
          const facultiesMap = data.reduce((acc: { [key: number]: string }, faculty: { id: number; name: string }) => {
            acc[faculty.id] = faculty.name;
            return acc;
          }, {});
          setFaculties(facultiesMap);
        })
        .catch((error) => console.error("Error fetching faculties:", error));
    }
  }, [show, selectedSubjects]);

  const toggleRow = (code: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(code)) {
      newExpandedRows.delete(code);
    } else {
      newExpandedRows.add(code);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleRegister = (subjectTimeId: number, subject: Subject) => {
    const studentUsername = user.username;
    fetch(`${baseUrl}/subjects/student-subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentUsername, subjectTimeId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to register for subject time");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Successfully registered:", data);
        onRegister({
          ...subject,
          id: data.studentSubjectId, // Use the ID provided by the backend response
          subject_time_id: subjectTimeId,
          passed: false,
        });
        setSubjects(subjects.filter((s) => s.code !== subject.code));
      })
      .catch((error) => console.error("Error registering for subject time:", error));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Galimi moduliai</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Kodas</th>
              <th>Pavadinimas</th>
              <th>Kreditai</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <React.Fragment key={subject.code}>
                <tr onClick={() => toggleRow(subject.code)}>
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>{subject.credits}</td>
                </tr>
                {expandedRows.has(subject.code) && (
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <p><strong>Aprašymas:</strong> {subject.description}</p>
                        <p><strong>Kalba:</strong> {subject.language}</p>
                        <p><strong>Nuotoliu:</strong> {subject.is_remote ? "Yes" : "No"}</p>
                        <p><strong>Fakultetas:</strong> {faculties[subject.fk_Facultyid]}</p>
                        <h5>Modulio laikai</h5>
                        <SubjectTimesList subjectCode={subject.code} onRegister={(subjectTimeId) => handleRegister(subjectTimeId, subject)} />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Uždaryti</Button>
      </Modal.Footer>
    </Modal>
  );
};

const SubjectTimesList = ({ subjectCode, onRegister }: { subjectCode: string, onRegister: (subjectTimeId: number) => void }) => {
  const [subjectTimes, setSubjectTimes] = useState<SubjectTime[]>([]);

  useEffect(() => {
    const fetchTimes = async () => {
      const response = await fetch(`${baseUrl}/subjects/${subjectCode}/times`);
      const data = await response.json();
      setSubjectTimes(data);
    };
    fetchTimes();
  }, [subjectCode]);

  return (
    <ul>
      {subjectTimes.map((time) => (
        <li key={time.id}>
          {`Laikas: ${time.hour}h, Diena: ${dayMapping[time.day]}, Klasė: ${time.classroom}, Studentų sk.: ${time.registered_students}/${time.capacity}, Lyginė savaitė: ${time.even_week ? "Taip" : "Ne"}`}
          <Button variant="primary" onClick={() => onRegister(time.id)}>Registruotis</Button>
        </li>
      ))}
    </ul>
  );
};

export default AvailableSubjectsModal;
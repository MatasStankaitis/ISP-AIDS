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

const AvailableSubjectsModal = ({ show, onHide, selectedSubjects, onRegister }: AvailableSubjectsModalProps) => {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState<Subject[]>([]);
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
        <Modal.Title id="contained-modal-title-vcenter">Available Subjects</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Credits</th>
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
                        <p><strong>Description:</strong> {subject.description}</p>
                        <p><strong>Language:</strong> {subject.language}</p>
                        <p><strong>Remote:</strong> {subject.is_remote ? "Yes" : "No"}</p>
                        <p><strong>Faculty ID:</strong> {subject.fk_Facultyid}</p>
                        <h5>Subject Times</h5>
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
        <Button onClick={onHide}>Close</Button>
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
          {`Time: ${time.hour}h, Day: ${time.day}, Classroom: ${time.classroom}, Capacity: ${time.registered_students}/${time.capacity}, Even Week: ${time.even_week ? "Yes" : "No"}`}
          <Button variant="primary" onClick={() => onRegister(time.id)}>Register</Button>
        </li>
      ))}
    </ul>
  );
};

export default AvailableSubjectsModal;
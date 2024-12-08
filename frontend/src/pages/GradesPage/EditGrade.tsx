// EditGradesPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormField from "../../components/FormField";

// Mock function to simulate fetching existing grades
const fetchGradesForStudent = (studentId) => {
  return [
    {
      id: 1,
      value: 8,
      comment: "Good performance, needs improvement in coding skills",
    },
    {
      id: 5,
      value: 6,
      comment: "Bad performance",
    },
  ];
};

const EditGradesPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const initialGrades = fetchGradesForStudent(studentId);
    setGrades(initialGrades);
  }, [studentId]);

  const handleGradeChange = (id: any, newGrade: any, eventId: any) => {
    const newGrades = grades.map((grade) => {
      if (grade.id == id) {
        return { ...grade, [eventId]: newGrade };
      } else {
        return grade;
      }
    });

    console.log(newGrades);
    setGrades(newGrades);
  };

  const handleSubmit = () => {
    // Logic to save updated grades for the student (e.g., API call)
    console.log(`Updated grades for student ${studentId}:`, grades);
    navigate(`/grades`);
  };

  return (
    <div>
      <h2>Redaguoti pažymį ({studentId}) studentui</h2>
      {grades.map((grade, index) => (
        <div>
          <FormField
            placeholder="pažymys"
            label={`Pažymys nr. ${index + 1}`}
            key={`grade_${index}`}
            controlId={`value`}
            type="text"
            value={grade.value}
            onChange={(e) =>
              handleGradeChange(grade.id, e.target.value, e.target.id)
            }
          ></FormField>
          <FormField
            placeholder="komentaras"
            label={`Komentaras`}
            key={`comment_${index}`}
            controlId={`comment`}
            type="text"
            value={grade.comment}
            onChange={(e) =>
              handleGradeChange(grade.id, e.target.value, e.target.id)
            }
          ></FormField>
        </div>
      ))}
      <Button variant="primary" onClick={handleSubmit}>
        Išsaugoti pakitimus
      </Button>
    </div>
  );
};

export default EditGradesPage;

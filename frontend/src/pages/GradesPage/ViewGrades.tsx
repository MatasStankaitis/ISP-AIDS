
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import FormField from "../../components/FormField";
import { baseUrl } from "../../constants";

const StudentViewGradePage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const { subjectCode, username } = useParams();

  // Mock function to simulate fetching existing grades
  const fetchGradesForStudent = () => {
    fetch(`${baseUrl}/grades/${subjectCode}/students/${username}/grades`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGrades(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchGradesForStudent();
  }, []);

  const updateStudentsGrades = () => {
    const dataToSend = grades;

    return fetch(
      `${baseUrl}/grades/${subjectCode}/students/${username}/grades`,
      {
        method: "PUT",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {})
      .catch((err) => {
        err;
      });
  };

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
    console.log(grades);
    //updateStudentsGrades();
    navigate(`/home/subjectsSelection`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gauti modulio pažymiai: {subjectCode}</h2>
      {grades.map((grade, index) => (
        <div key={index} className="mb-3 p-3 border rounded">
        <p><strong>Gautas pažymys:</strong> {grade.value}</p>
        <p><strong>Komentaras:</strong> {grade.comment}</p>
      </div>
      ))}
      <Button variant="primary" onClick={handleSubmit}>
        Grįžti atgal
      </Button>
    </div>
  );
};

export default StudentViewGradePage;

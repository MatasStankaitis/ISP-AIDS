// EditGradesPage.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import FormField from "../../components/FormField";
import { baseUrl } from "../../constants";

const EditGradesPage = () => {
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
    updateStudentsGrades();
    navigate(`/home/grades/${subjectCode}/students`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Redaguoti pažymį studentui: {username} </h2>
      {grades.length > 0 ? (
        grades.map((grade, index) => (
          <div key={index} className="mb-3 p-3 border rounded">
            <FormField
              placeholder="pažymys"
              label={`Pažymys nr. ${index + 1}`}
              controlId={`value`}
              type="text"
              value={grade.value}
              onChange={(e) =>
                handleGradeChange(grade.id, e.target.value, e.target.id)
              }
            />
            <FormField
              placeholder="komentaras"
              label="Komentaras"
              controlId={`comment`}
              type="text"
              value={grade.comment}
              onChange={(e) =>
                handleGradeChange(grade.id, e.target.value, e.target.id)
              }
            />
          </div>
        ))
      ) : (
        <p>Studentas neturi pažymių.</p>
      )}
      <Button variant="primary" onClick={handleSubmit}>
        Išsaugoti ir grįžti atgal
      </Button>
    </div>
  );
};

export default EditGradesPage;

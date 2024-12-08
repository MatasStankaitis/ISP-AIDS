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
    navigate(`/grades/${subjectCode}/students`);
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

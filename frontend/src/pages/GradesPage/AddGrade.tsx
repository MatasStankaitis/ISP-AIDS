// AddGradePage.js
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { baseUrl } from "../../constants";
import FormField from "../../components/FormField";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const AddGradePage = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState({
    value: null,
    comment: "",
    is_exam: true,
    importance: 5,
  });
  const { subjectCode, username } = useParams();

  const handleChange = (id: string, value: any) => {
    setGrade((previous) => {
      return { ...previous, [id]: value };
    });
  };
  const CreateStudentGrade = () => {
    const dataToSend = grade;
    return fetch(
      `${baseUrl}/grades/${subjectCode}/students/${username}/grades`,
      {
        method: "POST",
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

  const handleSubmit = () => {
    // Logic to save grades for the student (e.g., API call)
    CreateStudentGrade();
    navigate(`/home/grades/${subjectCode}/students`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Pridėti pažymį studentui: {username}</h2>
      <div className="mb-3 p-3 border rounded">
        <Container>
          <Form onSubmit={handleSubmit}>
            <FormField
              placeholder="pažymys"
              label={`Įrašykite pažymį`}
              controlId={`value`}
              type="text"
              value={grade.value}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            ></FormField>
            <FormField
              placeholder="komentaras"
              label={`Įrašykite komentarą`}
              controlId={`comment`}
              type="text"
              value={grade.comment}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            ></FormField>

            <Button type="submit">Pridėti pažymį</Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default AddGradePage;

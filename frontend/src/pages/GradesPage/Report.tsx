import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { baseUrl } from "../../constants";
import { listGrade } from "../../types/listGrade";

const Report = () => {
  const [grades, setGrades] = useState([] as listGrade[]);
  const { subjectCode, username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = () => {
    fetch(`${baseUrl}/grades/${subjectCode}/students/${username}/grades`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGrades(data);
      })
      .catch((error) => console.error("Error fetching grades:", error));
  };

  const handleBack = () => {
    navigate(`/home/grades/${subjectCode}/students`);
  };

  const calculateAverage = () => {
    if (grades.length === 0) return 0;
    const total = grades.reduce((sum, grade) => sum + grade.value, 0);
    return (total / grades.length).toFixed(2);
  };

  const getClassification = (average: number) => {
    if (average >= 9) return "Studentas mokosi puikiai";
    if (average >= 7) return "Studentas mokosi gerai";
    if (average >= 5) return "Studentui reikia pasistengti";
    return "Modulis neišlaikytas";
  };

  const average = parseFloat(calculateAverage());

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Studento ataskaita</h1>
      <h3 className="mb-3">Modulio kodas: {subjectCode}</h3>
      <h3 className="mb-3">Studento vardas: {username}</h3>
      {grades.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Gautas pažymys</th>
                <th>Komentaras</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{grade.value}</td>
                  <td>{grade.comment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4>Vidutinis pažymys: {average}</h4>
          <h4>Studento pažangumo lygis: {getClassification(average)}</h4>
        </>
      ) : (
        <p>Studentas neturi pažymių.</p>
      )}
      <Button variant="primary" onClick={handleBack}>
        Grįžti atgal
      </Button>
    </div>
  );
};

export default Report;
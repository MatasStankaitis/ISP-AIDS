// ViewGradesPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

// Mock function to simulate fetching grades
const fetchGradesForStudent = (studentId) => {
    return ["A", "B", "C"]; // Replace with real fetch logic
};

const ViewGradesPage = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        // Fetch grades for the student when the component mounts
        const fetchedGrades = fetchGradesForStudent(studentId);
        setGrades(fetchedGrades);
    }, [studentId]);

    return (
        <div>
            <h2>Pažymių ataskaita {studentId}</h2>
            <ul>
                {grades.map((grade, index) => (
                    <li key={index}>{grade}</li>
                ))}
            </ul>
            <Button variant="secondary" onClick={() => navigate(-1)}>Atgal</Button>
        </div>
    );
};

export default ViewGradesPage;

// EditGradesPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Mock function to simulate fetching existing grades
const fetchGradesForStudent = (studentId) => {
    return ["A", "B", "C"]; // Replace with real fetch logic
};

const EditGradesPage = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const initialGrades = fetchGradesForStudent(studentId);
        setGrades(initialGrades);
    }, [studentId]);

    const handleGradeChange = (index, newGrade) => {
        const updatedGrades = [...grades];
        updatedGrades[index] = newGrade;
        setGrades(updatedGrades);
    };

    const handleSubmit = () => {
        // Logic to save updated grades for the student (e.g., API call)
        console.log(`Updated grades for student ${studentId}:`, grades);
        navigate(`/grades`);
    };

    return (
        <div>
            <h2>Edit Grades for Student {studentId}</h2>
            {grades.map((grade, index) => (
                <Form.Group key={index} controlId={`gradeInput-${index}`}>
                    <Form.Label>Grade {index + 1}</Form.Label>
                    <Form.Control
                        type="text"
                        value={grade}
                        onChange={(e) => handleGradeChange(index, e.target.value)}
                    />
                </Form.Group>
            ))}
            <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
        </div>
    );
};

export default EditGradesPage;

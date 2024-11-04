// AddGradePage.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddGradePage = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [grades, setGrades] = useState([]);
    const [currentGrade, setCurrentGrade] = useState("");

    const handleAddGrade = () => {
        if (currentGrade) {
            setGrades([...grades, currentGrade]);
            setCurrentGrade("");
        }
    };

    const handleSubmit = () => {
        // Logic to save grades for the student (e.g., API call)
        console.log(`Grades for student ${studentId}:`, grades);
        navigate(`/grades`);
    };

    return (
        <div>
            <h2>Add Grades for Student {studentId}</h2>
            <Form.Group controlId="gradeInput">
                <Form.Label>Enter Grade</Form.Label>
                <Form.Control
                    type="text"
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(e.target.value)}
                />
            </Form.Group>
            <Button onClick={handleAddGrade}>Add Grade</Button>
            <div>
                <h4>Grades to be added:</h4>
                <ul>
                    {grades.map((grade, index) => (
                        <li key={index}>{grade}</li>
                    ))}
                </ul>
            </div>
            <Button variant="primary" onClick={handleSubmit}>Save Grades</Button>
        </div>
    );
};

export default AddGradePage;

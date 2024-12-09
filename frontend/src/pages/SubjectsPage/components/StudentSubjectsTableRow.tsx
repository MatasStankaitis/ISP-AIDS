import React from "react";
import Button from "react-bootstrap/Button";

interface StudentSubjectsTableRowProps {
  id: number;
  subject_code: string;
  subject_name: string;
  passed: boolean;
  onDelete: (id: number) => void;
  onViewGrades: (code: string) => void;
}

const StudentSubjectsTableRow = ({
  id,
  subject_code,
  subject_name,
  passed,
  onDelete,
  onViewGrades,
}: StudentSubjectsTableRowProps) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{subject_code}</td>
      <td>{subject_name}</td>
      <td>{passed ? "Yes" : "No"}</td>
      <td>
        <Button variant="danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
        <Button variant="info" onClick={() => onViewGrades(subject_code)}>
          View Grades
        </Button>
      </td>
    </tr>
  );
};

export default StudentSubjectsTableRow;
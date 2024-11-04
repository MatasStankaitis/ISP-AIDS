import React from 'react';
import { Button } from 'react-bootstrap';

const LecturerDataTableRow = ({ lecturer, onDelete, onEditSalary }) => {
  return (
    <tr>
      <td>{lecturer.firstName}</td>
      <td>{lecturer.lastName}</td>
      <td>{lecturer.email}</td>
      <td>{lecturer.salary} €</td>
      <td>
        <Button variant="info" onClick={() => onEditSalary(lecturer.id)}>Redaguoti atlyginimą</Button>{' '}
        <Button variant="danger" onClick={() => onDelete(lecturer.id)}>Pašalinti</Button>
      </td>
    </tr>
  );
};

export default LecturerDataTableRow;

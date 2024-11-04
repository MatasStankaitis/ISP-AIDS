import React from 'react';
import Table from 'react-bootstrap/Table';
import LecturerDataTableRow from './LecturerDataTableRow';

const LecturerDataTable = ({ lecturers, onDelete, onEditSalary }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Vardas</th>
          <th>Pavardė</th>
          <th>El. paštas</th>
          <th>Atlyginimas</th>
          <th>Veiksmai</th>
        </tr>
      </thead>
      <tbody>
        {lecturers.map((lecturer) => (
          <LecturerDataTableRow
            key={lecturer.id}
            lecturer={lecturer}
            onDelete={onDelete}
            onEditSalary={onEditSalary}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default LecturerDataTable;

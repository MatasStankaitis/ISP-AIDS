﻿import Table from "react-bootstrap/Table";

const StudentDataTable = ({ rows }) => {
  return (
    <div className="table-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Funkcijos</th>
          </tr>
        </thead>
        {rows}
      </Table>
    </div>
  );
};

export default StudentDataTable;

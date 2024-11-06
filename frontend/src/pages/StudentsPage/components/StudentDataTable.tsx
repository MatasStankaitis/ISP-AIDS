import { ReactElement } from "react";
import Table from "react-bootstrap/Table";

interface StudentDataTableProps {
  rows: ReactElement;
}

const StudentDataTable = ({ rows }: StudentDataTableProps) => {
  return (
    <div className="table-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Vidko</th>
            <th>Funkcijos</th>
          </tr>
        </thead>
        {rows}
      </Table>
    </div>
  );
};

export default StudentDataTable;

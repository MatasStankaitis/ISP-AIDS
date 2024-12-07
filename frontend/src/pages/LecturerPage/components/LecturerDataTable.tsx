import { ReactElement } from "react";
import Table from "react-bootstrap/Table";

interface LecturerDataTableProps {
  rows: ReactElement[];
}

const LecturerDataTable = ({ rows }: LecturerDataTableProps) => {
  return (
    <div className="table-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows} {/* Directly use the rows prop */}
        </tbody>
      </Table>
    </div>
  );
};

export default LecturerDataTable;

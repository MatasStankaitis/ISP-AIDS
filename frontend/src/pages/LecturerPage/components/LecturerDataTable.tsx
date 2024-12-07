import { ReactElement } from "react";
import Table from "react-bootstrap/Table";

interface LecturerDataTableProps {
  rows: ReactElement[]; // Accept an array of React elements
}

const LecturerDataTable = ({ rows }: LecturerDataTableProps) => {
  return (
    <div className="table-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Vartotojo vardas</th>
            <th>Telefono nr.</th>
            <th>El. paštas</th>
            <th>Statusas</th>
            <th>Fakultetas</th>
            <th>Adresas</th>
            <th>Lytis</th>
            <th>Atlyginimas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default LecturerDataTable;

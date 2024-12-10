import Table from "react-bootstrap/Table";

const StudentSubjectsTable = ({ rows }) => {
  return (
    <div className="table-responsive">
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Kodas</th>
            <th>Pavadinimas</th>
            <th>Kreditai</th>
            <th>Kalba</th>
            <th>Nuotoliu</th>
            <th>Fakultetas</th>
          </tr>
        </thead>
        {rows}
      </Table>
    </div>
  );
};

export default StudentSubjectsTable;
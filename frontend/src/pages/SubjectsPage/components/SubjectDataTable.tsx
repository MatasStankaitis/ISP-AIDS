import Table from "react-bootstrap/Table";

const SubjectDataTable = ({ rows }) => {
  return (
    <div className="table-responsive">
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Kodas</th>
            <th>Pavadinimas</th>
            <th>Kreditų sk.</th>
            <th>Kalba</th>
            <th>Nuotoliu</th>
            <th>Fakultetas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        {rows}
      </Table>
    </div>
  );
};

export default SubjectDataTable;
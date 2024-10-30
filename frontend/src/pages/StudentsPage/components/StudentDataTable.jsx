import Table from "react-bootstrap/Table";

const StudentDataTable = ({ rows }) => {
  return (
    <div className="table-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Extra</th>
            <th>Funkcijos</th>
          </tr>
        </thead>
        {rows}
      </Table>
    </div>
  );
};

export default StudentDataTable;

import Table from "react-bootstrap/Table";

const StudentDataTable = ({ rows }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Extra</th>
          <th></th>
        </tr>
      </thead>
      {rows}
    </Table>
  );
};

export default StudentDataTable;

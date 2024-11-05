import Table from "react-bootstrap/Table";

const SubjectDataTable = ({ rows }) => {
  return (
    <div className="table-div">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Language</th>
            <th>Remote</th>
            <th>Actions</th>
          </tr>
        </thead>
        {rows}
      </Table>
    </div>
  );
};

export default SubjectDataTable;

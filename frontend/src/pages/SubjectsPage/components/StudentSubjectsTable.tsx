import Table from "react-bootstrap/Table";

const StudentSubjectsTable = ({ rows }) => {
  return (
    <div className="table-responsive">
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Language</th>
            <th>Remote</th>
            <th>Faculty</th>
          </tr>
        </thead>
        {rows}
      </Table>
    </div>
  );
};

export default StudentSubjectsTable;
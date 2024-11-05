import Form from "react-bootstrap/Form";

const SubjectFiltersDiv = ({ name, onChange }) => {
  return (
    <div className="filtersDiv">
      <Form>
        <Form.Group className="mb-3" controlId="nameInput">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            onChange={onChange}
            type="text"
            value={name}
            placeholder="Enter subject name"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SubjectFiltersDiv;

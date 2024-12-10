import Form from "react-bootstrap/Form";

const SubjectFiltersDiv = ({ name, onChange }) => {
  return (
    <div className="filtersDiv">
      <Form>
        <Form.Group className="mb-3" controlId="nameInput">
          <Form.Label>Modulio pavadinimas</Form.Label>
          <Form.Control
            onChange={onChange}
            type="text"
            value={name}
            placeholder="Įveskite modulio pavadinimą"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SubjectFiltersDiv;

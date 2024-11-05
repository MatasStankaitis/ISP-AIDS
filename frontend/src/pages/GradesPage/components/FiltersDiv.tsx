import Form from "react-bootstrap/Form";

const FiltersDiv = ({ name, surname, onChange }) => {
  return (
    <div className="filtersDiv">
      <Form>
        <Form.Group className="mb-3" controlId="firstnameInput">
          <Form.Label>Vardas</Form.Label>
          <Form.Control
            onChange={onChange}
            type="firstName"
            value={name}
            placeholder="Vardenis"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="surnameInput">
          <Form.Label>Pavardė</Form.Label>
          <Form.Control
            onChange={onChange}
            type="lastName"
            value={surname}
            placeholder="Pavardenis"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default FiltersDiv;

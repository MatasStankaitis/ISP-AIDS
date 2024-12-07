import Form from "react-bootstrap/Form";

interface FiltersDivProps {
  name: string; // 'name' should be a string
  surname: string; // 'surname' should be a string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 'onChange' should be a function
}

const FiltersDiv: React.FC<FiltersDivProps> = ({ name, surname, onChange }) => {
  return (
    <div className="filtersDiv">
      <Form>
        <Form.Group className="mb-3" controlId="firstnameInput">
          <Form.Label>Vardas</Form.Label>
          <Form.Control
            onChange={onChange}
            type="text" // Change to a valid type 'text'
            value={name}
            placeholder="Vardenis"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="surnameInput">
          <Form.Label>Pavardė</Form.Label>
          <Form.Control
            onChange={onChange}
            type="text" // Change to a valid type 'text'
            value={surname}
            placeholder="Pavardenis"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default FiltersDiv;

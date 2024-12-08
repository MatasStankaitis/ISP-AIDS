import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dispatch, SetStateAction, useState } from "react";
import { listStudent } from "../../../types/listStudent";
import { baseUrl } from "../../../constants";

interface FiltersDivProp {
  onFilter: Dispatch<SetStateAction<listStudent[]>>;
  subjectCode: string;
}
const FiltersDiv = ({ onFilter, subjectCode }: FiltersDivProp) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const onChange = (e: any) => {
    switch (e.target.id) {
      case "firstnameInput":
        setName(e.target.value);
        break;
      case "surnameInput":
        setSurname(e.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${baseUrl}/grades/${subjectCode}/students`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        onFilter(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="filtersDiv">
      <Form onSubmit={handleSubmit}>
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
        <Button
          style={{ width: "100%", marginBottom: "20px" }}
          variant="primary"
          type="submit"
        >
          Filtruoti
        </Button>
      </Form>
    </div>
  );
};

export default FiltersDiv;

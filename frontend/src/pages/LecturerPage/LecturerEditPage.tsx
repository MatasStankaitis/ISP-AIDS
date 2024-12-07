import { useParams, useNavigate } from "react-router-dom";
import LECTURERS from "../../prototypeData/lecturers";
import FACULTIES from "../../prototypeData/faculties";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LecturerEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lecturer = LECTURERS.find((lect) => lect.id === Number(id));

  const handleSave = () => {
    console.log("Mock saving lecturer data"); // Placeholder for saving logic
    navigate(`/lecturers/${id}`);
  };

  return (
    <Container>
      <h1>Redaguoti dėstytoją</h1>
      <Form>
        <Form.Group>
          <Form.Label>Vardas</Form.Label>
          <Form.Control defaultValue={lecturer?.name || "N/A"} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pavardė</Form.Label>
          <Form.Control defaultValue={lecturer?.surname || "N/A"} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Vartotojo vardas</Form.Label>
          <Form.Control defaultValue={lecturer?.username || "N/A"} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Telefono nr.</Form.Label>
          <Form.Control defaultValue={lecturer?.phone || "N/A"} />
        </Form.Group>
        <Form.Group>
          <Form.Label>El. paštas</Form.Label>
          <Form.Control defaultValue={lecturer?.email || "N/A"} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Statusas</Form.Label>
          <Form.Control defaultValue={lecturer?.status || "N/A"} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Faculty">
          <Form.Label>Fakultetas</Form.Label>
          <Form.Select defaultValue={lecturer?.faculty || ""}>
            <option>Pasirinkti...</option>
            {FACULTIES.map((f, i) => (
              <option key={i} value={f.id}>
                {f.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Gender">
          <Form.Label>Lytis</Form.Label>
          <Form.Select defaultValue={lecturer?.gender || ""}>
            <option>Pasirinkti...</option>
            <option value="1">Vyras</option>
            <option value="2">Moteris</option>
            <option value="3">Kita</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Adresas</Form.Label>
          <Form.Control defaultValue={lecturer?.address || "N/A"} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Atlyginimas</Form.Label>
          <Form.Control defaultValue={lecturer?.salary || 0} />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Išsaugoti
        </Button>
      </Form>
    </Container>
  );
};

export default LecturerEditPage;

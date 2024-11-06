import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import FACULTIES from "../../../prototypeData/faculties";

interface MyModalProps {
  onHide: () => void;
  show: boolean;
}

const ExportModal = ({ onHide, show }: MyModalProps) => {
  return (
    <Modal
      onHide={onHide}
      show={show}
      name={name}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Studentų duomenų eksportus?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Pasirinkite norimus filtrus studentų eksportui</h4>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="Faculty">
                <Form.Label>Fakultetas</Form.Label>
                <Form.Select required>
                  <option>Pasirinkti...</option>
                  {FACULTIES.map((f, i) => (
                    <option key={i} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="Year">
                <Form.Label>Kursas</Form.Label>
                <Form.Select>
                  <option>Pasirinkti...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="AcademicGroup">
                <Form.Label>Akademinė grupė</Form.Label>
                <Form.Select>
                  <option>Pasirinkti...</option>
                  <option value="1">IFF-2/5</option>
                  <option value="2">IFF-2/6</option>
                  <option value="3">IFF-2/7</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Exportuoti duomenis</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportModal;

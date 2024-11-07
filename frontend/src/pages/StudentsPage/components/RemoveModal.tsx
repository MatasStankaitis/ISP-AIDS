import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface RemoveModalProps {
  name: string;
  onHide: () => void;
  show: boolean;
}

const RemoveModal = ({ name, onHide, show }: RemoveModalProps) => {
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
          Ar tikrai norite ištrinti studentą {name}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Ar tikrai norite pašalinti studentą? Paspaudus "Pašalinti studentą"
          studento duomenys visiems laikams bus ištrinti iš sistemos
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-danger" onClick={onHide}>
          Pašalinti studentą
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveModal;

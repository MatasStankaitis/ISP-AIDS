import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface LecturerRemoveModalProps {
  name: string;
  onHide: () => void;
  show: boolean;
}

const LecturerRemoveModal = ({ name, onHide, show }: LecturerRemoveModalProps) => {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Panaikinti dėstytoją?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Ar tikrai norite ištrinti dėstytoją {name}? Šis veiksmas yra negrįžtamas.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Patvirtinti</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LecturerRemoveModal;
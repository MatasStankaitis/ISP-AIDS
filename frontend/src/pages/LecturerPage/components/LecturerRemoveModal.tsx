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
          Remove Lecturer?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to remove {name}? This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LecturerRemoveModal;
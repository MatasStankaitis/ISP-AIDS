import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FACULTIES from "../../../prototypeData/faculties";
import { CSVLink } from "react-csv";
import { useEffect, useRef, useState } from "react";
import { baseUrl } from "../../../constants";

interface ExportModalProps {
  onHide: () => void;
  show: boolean;
}

const ExportModal = ({ onHide, show }: ExportModalProps) => {
  const facultySelect = useRef<HTMLSelectElement>(null);
  const groupSelect = useRef<HTMLSelectElement>(null);
  const yearSelect = useRef<HTMLSelectElement>(null);
  const [exportStudentsData, setExportStudentsData] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleClick = (event: any) => {
    onHide();
  };

  const fetchStudents = () => {
    const facultyId = facultySelect.current?.value || "";
    const groupId = groupSelect.current?.value || "";
    const year = yearSelect.current?.value || "";
    let queryParams = [];
    if (facultyId)
      queryParams.push(`facultyId=${encodeURIComponent(facultyId)}`);
    if (groupId)
      queryParams.push(`academicGroupId=${encodeURIComponent(groupId)}`);
    if (year) queryParams.push(`year=${encodeURIComponent(year)}`);
    const params = queryParams.length > 0 ? "?" + queryParams.join("&") : "";
    const url = `${baseUrl}/students${params}`;
    console.log(url);
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setExportStudentsData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchGroups = () => {
    fetch(`${baseUrl}/groups`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const fetchFaculties = () => {
    fetch(`${baseUrl}/faculties`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFaculties(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const handleInput = () => {
    fetchStudents();
  };

  useEffect(() => {
    if (show) {
      fetchStudents();
      fetchGroups();
      fetchFaculties();
    }
  }, [show]);

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
                <Form.Select onInput={handleInput} ref={facultySelect} required>
                  <option value="">Pasirinkti...</option>
                  {faculties.map((f, i) => (
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
                <Form.Select onInput={handleInput} ref={yearSelect}>
                  <option value="">Pasirinkti...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="AcademicGroup">
                <Form.Label>Akademinė grupė</Form.Label>
                <Form.Select onInput={handleInput} ref={groupSelect}>
                  <option value="">Pasirinkti...</option>
                  {groups.map((f, i) => (
                    <option key={i} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CSVLink data={exportStudentsData} filename="data.csv" target="_blank">
          <Button onClick={handleClick}>Exportuoti duomenis</Button>
        </CSVLink>
      </Modal.Footer>
    </Modal>
  );
};

export default ExportModal;

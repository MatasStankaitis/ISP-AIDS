import { useParams, useNavigate, Link } from "react-router-dom";
import LECTURERS from "../../prototypeData/lecturers";
import FACULTIES from "../../prototypeData/faculties";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LECTURER_STATUSES from "../../prototypeData/lecturerStatuses";

const LecturerEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const lecturer = LECTURERS.find((lect) => lect.id === Number(id));

    const handleSave = () => {
        console.log("Mock saving lecturer data"); // Placeholder for saving logic
        navigate(`/home/lecturers/${id}`);
    };

    if (!lecturer) {
        return <p>Dėstytojas nerastas.</p>;
    }

    return (
        <Container>
            <h1>Redaguoti dėstytoją</h1>
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Vardas</Form.Label>
                            <Form.Control defaultValue={lecturer.name || "N/A"} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Pavardė</Form.Label>
                            <Form.Control defaultValue={lecturer.surname || "N/A"} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Vartotojo vardas</Form.Label>
                            <Form.Control defaultValue={lecturer.username || "N/A"} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Telefono nr.</Form.Label>
                            <Form.Control defaultValue={lecturer.phone || "N/A"} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>El. paštas</Form.Label>
                            <Form.Control defaultValue={lecturer.email || "N/A"} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="Status">
                            <Form.Label>Statusas</Form.Label>
                            <Form.Select defaultValue={lecturer.status || ""}>
                                <option>Pasirinkti...</option>
                                {LECTURER_STATUSES.map((status, i) => (
                                    <option key={i} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="Faculty">
                            <Form.Label>Fakultetas</Form.Label>
                            <Form.Select defaultValue={lecturer.faculty || ""}>
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
                        <Form.Group className="mb-3" controlId="Gender">
                            <Form.Label>Lytis</Form.Label>
                            <Form.Select defaultValue={lecturer.gender || ""}>
                                <option>Pasirinkti...</option>
                                <option value="1">Vyras</option>
                                <option value="2">Moteris</option>
                                <option value="3">Kita</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Adresas</Form.Label>
                            <Form.Control defaultValue={lecturer.address || "N/A"} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Atlyginimas</Form.Label>
                            <Form.Control defaultValue={lecturer.salary || 0} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button style={{ width: "100%" }} variant="primary" onClick={handleSave}>
                            Išsaugoti
                        </Button>
                    </Col>
                    <Col>
                        <Link to={`/home/lecturers/${id}`}>
                            <Button style={{ width: "100%" }} variant="secondary">
                                Grįžti į profilį
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default LecturerEditPage;

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { baseUrl } from "../../constants";

interface Lecturer {
    name: string;
    surname: string;
    username: string;
    phone_number: string;
    email: string;
    home_address: string;
    gender: string;
    status: string;
    faculty: string;
    current_salary: number;
    onRemove: (username: string) => void; // Changed parameter to username
}

const LecturerEditPage = () => {
    const { id } = useParams(); // `id` is the username of the lecturer
    const navigate = useNavigate();
    const [lecturer, setLecturer] = useState<Lecturer[]>([]);
    const [statuses, setStatuses] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [genders, setGenders] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        surname: "",
        username: "",
        phone_number: "",
        email: "",
        home_address: "",
        gender: "",
        faculty: "",
        current_salary: "",
        status: "",
    });
    // Fetch lecturer data
    useEffect(() => {
        fetchLecturer();
        fetchStatuses();
        fetchFaculties();
        fetchGenders();
    }, [id]);
    const fetchStatuses = async () => {
        try {
            console.log("Fetching statuses...");
            const response = await fetch(`${baseUrl}/lecturers/statuses`);
            const data = await response.json();
            setStatuses(data);
        } catch (error) {
            console.error("Failed to fetch statuses:", error);
        }
    };
    const fetchFaculties = async () => {
        try {
            console.log("Fetching faculties...");
            const response = await fetch(`${baseUrl}/faculties`);
            const data = await response.json();
            setFaculties(data);
        } catch (error) {
            console.error("Failed to fetch faculties:", error);
        }
    };

    const fetchGenders = async () => {
        try {
            console.log("Fetching genders...");
            const response = await fetch(`${baseUrl}/genders`);
            const data = await response.json();
            setGenders(data);
        } catch (error) {
            console.error("Failed to fetch genders:", error);
        }
    };

    const handleSave = async () => {
        try {
            const lecturerUsername = formState.username; // Ensure this comes from the formState
            console.log("PUT URL:", `${baseUrl}/lecturers/${lecturerUsername}`);
            console.log("Request Body:", formState);

            const response = await fetch(`${baseUrl}/lecturers/${lecturerUsername}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formState),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update lecturer.");
            }

            alert("Sėkmingai pakeisti duomenys");
            navigate(`/lecturers/${lecturerUsername}`);
        } catch (error) {
            console.error("Error updating lecturer:", error);
        }
    };




    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [id]: value }));
    };

    if (!lecturer) {
        return <p>Kraunama...</p>;
    }

    const fetchLecturer = async () => {
        try {
            console.log("Fetching lecturer details...");
            const response = await fetch(`${baseUrl}/lecturers/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch lecturer data.");
            }
            const data = await response.json();
            console.log("Lecturer details fetched:", data);

            setLecturer(data);
            console.log(data);
            setFormState({
                name: data.name || "",
                surname: data.surname || "",
                username: data.username || "",
                phone_number: data.phone_number || "",
                email: data.email || "",
                home_address: data.home_address || "",
                gender: data.gender || "",
                faculty: data.faculty || "",
                current_salary: data.current_salary || "",
                status: data.status || "",
            });
        } catch (error) {
            console.error("Error fetching lecturer:", error);
        }
    };

    return (
        <Container>
          <h1>Redaguoti dėstytoją</h1>
      
          {successMessage && (
            <Alert variant="success">
              Sėkmingai pakeisti duomenys!
            </Alert>
          )}
      
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Vardas</Form.Label>
                  <Form.Control
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Pavardė</Form.Label>
                  <Form.Control
                    id="surname"
                    value={formState.surname}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Vartotojo vardas</Form.Label>
                  <Form.Control
                    id="username"
                    value={formState.username}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Telefono nr.</Form.Label>
                  <Form.Control
                    id="phone_number"
                    value={formState.phone_number}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>El. paštas</Form.Label>
                  <Form.Control
                    id="email"
                    value={formState.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Statusas</Form.Label>
                  <Form.Select
                    id="status"
                    value={formState.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Pasirinkti...</option>
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Fakultetas</Form.Label>
                  <Form.Select
                    id="faculty"
                    value={formState.faculty}
                    onChange={handleInputChange}
                  >
                    <option value="">Pasirinkti...</option>
                    {faculties.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Lytis</Form.Label>
                  <Form.Select
                    id="gender"
                    value={formState.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Pasirinkti...</option>
                    {genders.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Adresas</Form.Label>
                  <Form.Control
                    id="home_address"
                    value={formState.home_address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Atlyginimas</Form.Label>
                  <Form.Control
                    id="current_salary"
                    type="number"
                    value={formState.current_salary}
                    onChange={handleInputChange}
                  />
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

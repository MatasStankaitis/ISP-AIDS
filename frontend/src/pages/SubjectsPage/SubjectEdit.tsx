import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../constants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const SubjectEdit = () => {
  const { code } = useParams();
  const [formState, setFormState] = useState({
    name: "",
    credits: "",
    description: "",
    language: "",
    is_remote: false,
    fk_Facultyid: 0,
  });
  const [faculties, setFaculties] = useState([]);
  const [subjectTimes, setSubjectTimes] = useState([]);
  const [originalFormState, setOriginalFormState] = useState({});
  const [originalSubjectTimes, setOriginalSubjectTimes] = useState([]);
  const [timesChanged, setTimesChanged] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/subjects/${code}`)
      .then((response) => response.json())
      .then((data) => {
        setFormState(data);
        setOriginalFormState(data);
      })
      .catch((error) => console.error("Error fetching subject:", error));
    fetch(`${baseUrl}/faculties`)
      .then((response) => response.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error("Error fetching faculties:", error));
    fetch(`${baseUrl}/subjects/${code}/times`)
      .then((response) => response.json())
      .then((data) => {
        setSubjectTimes(data);
        setOriginalSubjectTimes(data);
        setTimesChanged(new Array(data.length).fill(false));
        setErrorMessages(new Array(data.length).fill(""));
      })
      .catch((error) => console.error("Error fetching subject times:", error));
  }, [code]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormState((prevState) => {
      const updatedState = { ...prevState, [id]: newValue };
      setIsFormChanged(JSON.stringify(updatedState) !== JSON.stringify(originalFormState));
      return updatedState;
    });
  };

  const handleTimeChange = (index, e) => {
    const { id, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const updatedTimes = [...subjectTimes];
    updatedTimes[index] = { ...updatedTimes[index], [id]: newValue };
    setSubjectTimes(updatedTimes);
    const updatedTimesChanged = [...timesChanged];
    updatedTimesChanged[index] = JSON.stringify(updatedTimes[index]) !== JSON.stringify(originalSubjectTimes[index]);
    setTimesChanged(updatedTimesChanged);
  };

  const handleAddTime = () => {
    setSubjectTimes([...subjectTimes, { hour: "", day: "", classroom: "", capacity: "", even_week: false, fk_Subjectcode: code, isNew: true }]);
    setTimesChanged([...timesChanged, true]);
    setErrorMessages([...errorMessages, ""]);
  };

  const handleCancelTime = (index) => {
    const updatedTimes = subjectTimes.filter((_, i) => i !== index);
    setSubjectTimes(updatedTimes);
    const updatedTimesChanged = timesChanged.filter((_, i) => i !== index);
    setTimesChanged(updatedTimesChanged);
    const updatedErrorMessages = errorMessages.filter((_, i) => i !== index);
    setErrorMessages(updatedErrorMessages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${baseUrl}/subjects/${code}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error: ${response.status} ${response.statusText} - ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        subjectTimes.forEach((time) => {
          if (time.id) {
            fetch(`${baseUrl}/subjects/times/${time.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(time),
            });
          } else {
            fetch(`${baseUrl}/subjects/${code}/times`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(time),
            })
              .then((response) => response.json())
              .then((data) => {
                const updatedTimes = [...subjectTimes];
                updatedTimes[index].id = data.subjectTimeId;
                setSubjectTimes(updatedTimes);
              });
          }
        });
        navigate("/home/subjects");
      })
      .catch((error) => console.error("Error updating subject:", error));
  };

  const handleTimeSubmit = (index, e) => {
    e.preventDefault();
    const time = subjectTimes[index];
    const url = time.isNew ? `${baseUrl}/subjects/${code}/times` : `${baseUrl}/subjects/times/${time.id}`;
    const method = time.isNew ? "POST" : "PUT";
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(time),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error: ${response.status} ${response.statusText} - ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (time.isNew) {
          const updatedTimes = [...subjectTimes];
          updatedTimes[index].id = data.subjectTimeId;
          updatedTimes[index].isNew = false;
          setSubjectTimes(updatedTimes);
        }
        const updatedTimesChanged = [...timesChanged];
        updatedTimesChanged[index] = false;
        setTimesChanged(updatedTimesChanged);
        const updatedErrorMessages = [...errorMessages];
        updatedErrorMessages[index] = ""; // Clear any previous error messages
        setErrorMessages(updatedErrorMessages);
      })
      .catch((error) => {
        if (error.message.includes("A subject time with the same hour, day, classroom, subject code, and even week value already exists.")) {
          const updatedErrorMessages = [...errorMessages];
          updatedErrorMessages[index] = "A subject time with the same hour, day, classroom, subject code, and even week value already exists.";
          setErrorMessages(updatedErrorMessages);
        } else {
          console.error("Error updating subject time:", error);
        }
      });
  };

  const handleTimeDelete = (index) => {
    const time = subjectTimes[index];
    fetch(`${baseUrl}/subjects/times/${time.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Error: ${response.status} ${response.statusText} - ${text}`);
          });
        }
        return response.json();
      })
      .then(() => {
        const updatedTimes = subjectTimes.filter((_, i) => i !== index);
        setSubjectTimes(updatedTimes);
        const updatedTimesChanged = timesChanged.filter((_, i) => i !== index);
        setTimesChanged(updatedTimesChanged);
        const updatedErrorMessages = errorMessages.filter((_, i) => i !== index);
        setErrorMessages(updatedErrorMessages);
      })
      .catch((error) => console.error("Error deleting subject time:", error));
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Edit Subject</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="credits" className="mb-3">
                  <Form.Label>Credits</Form.Label>
                  <Form.Control
                    type="number"
                    value={formState.credits}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={formState.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="language" className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    type="text"
                    value={formState.language}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="is_remote" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Remote"
                    checked={formState.is_remote}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="fk_Facultyid" className="mb-3">
                  <Form.Label>Faculty</Form.Label>
                  <Form.Control
                    as="select"
                    value={formState.fk_Facultyid}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Faculty...</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Link to="/home/subjects">
                  <Button variant="secondary" className="ms-2">
                    Back to Subjects List
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Edit Subject Times</Card.Title>
              {subjectTimes.map((time, index) => (
                <div key={time.id || index}>
                  {errorMessages[index] && <Alert variant="danger">{errorMessages[index]}</Alert>}
                  <Form onSubmit={(e) => handleTimeSubmit(index, e)} className="mb-3">
                    <Form.Group controlId="hour" className="mb-2">
                      <Form.Label>Hour</Form.Label>
                      <Form.Control
                        type="number"
                        value={time.hour}
                        onChange={(e) => handleTimeChange(index, e)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="day" className="mb-2">
                      <Form.Label>Day</Form.Label>
                      <Form.Control
                        type="number"
                        value={time.day}
                        onChange={(e) => handleTimeChange(index, e)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="classroom" className="mb-2">
                      <Form.Label>Classroom</Form.Label>
                      <Form.Control
                        type="text"
                        value={time.classroom}
                        onChange={(e) => handleTimeChange(index, e)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="capacity" className="mb-2">
                      <Form.Label>Capacity</Form.Label>
                      <Form.Control
                        type="number"
                        value={time.capacity}
                        onChange={(e) => handleTimeChange(index, e)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="even_week" className="mb-2">
                      <Form.Check
                        type="checkbox"
                        label="Even Week"
                        checked={time.even_week}
                        onChange={(e) => handleTimeChange(index, e)}
                      />
                    </Form.Group>
                    {timesChanged[index] && (
                      <>
                        <Button variant="primary" type="submit" className="me-2">
                          {time.isNew ? "Create Time" : "Save Time"}
                        </Button>
                        {time.isNew && (
                          <Button variant="secondary" onClick={() => handleCancelTime(index)}>
                            Cancel
                          </Button>
                        )}
                      </>
                    )}
                    {!time.isNew && (
                      <Button variant="danger" onClick={() => handleTimeDelete(index)}>
                        Delete Time
                      </Button>
                    )}
                  </Form>
                </div>
              ))}
              <Button variant="secondary" onClick={handleAddTime}>
                Add Time
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SubjectEdit;
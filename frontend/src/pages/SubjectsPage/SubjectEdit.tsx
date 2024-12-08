import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

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
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/subjects/${code}`)
      .then((response) => response.json())
      .then((data) => setFormState(data))
      .catch((error) => console.error("Error fetching subject:", error));

    fetch(`${baseUrl}/faculties`)
      .then((response) => response.json())
      .then((data) => setFaculties(data))
      .catch((error) => console.error("Error fetching faculties:", error));

    fetch(`${baseUrl}/subjects/${code}/times`)
      .then((response) => response.json())
      .then((data) => setSubjectTimes(data))
      .catch((error) => console.error("Error fetching subject times:", error));
  }, [code]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTimeChange = (index, e) => {
    const { id, value, type, checked } = e.target;
    const updatedTimes = [...subjectTimes];
    updatedTimes[index] = { ...updatedTimes[index], [id]: type === "checkbox" ? checked : value };
    setSubjectTimes(updatedTimes);
  };

  const handleAddTime = () => {
    setSubjectTimes([...subjectTimes, { hour: "", day: "", classroom: "", capacity: "", even_week: false, fk_Subjectcode: code, isNew: true }]);
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
      .then(() => {
        if (time.isNew) {
          const updatedTimes = [...subjectTimes];
          updatedTimes[index].isNew = false;
          setSubjectTimes(updatedTimes);
        }
      })
      .catch((error) => console.error("Error updating subject time:", error));
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
      })
      .catch((error) => console.error("Error deleting subject time:", error));
  };

  return (
    <Container>
      <h1>Edit Subject</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="credits">
          <Form.Label>Credits</Form.Label>
          <Form.Control
            type="number"
            value={formState.credits}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={formState.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="language">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            value={formState.language}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="is_remote">
          <Form.Check
            type="checkbox"
            label="Remote"
            checked={formState.is_remote}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="fk_Facultyid">
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
      </Form>
      <h2>Edit Subject Times</h2>
      {subjectTimes.map((time, index) => (
        <Form key={time.id || index} onSubmit={(e) => handleTimeSubmit(index, e)}>
          <Form.Group controlId="hour">
            <Form.Label>Hour</Form.Label>
            <Form.Control
              type="number"
              value={time.hour}
              onChange={(e) => handleTimeChange(index, e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="day">
            <Form.Label>Day</Form.Label>
            <Form.Control
              type="number"
              value={time.day}
              onChange={(e) => handleTimeChange(index, e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="classroom">
            <Form.Label>Classroom</Form.Label>
            <Form.Control
              type="text"
              value={time.classroom}
              onChange={(e) => handleTimeChange(index, e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="capacity">
            <Form.Label>Capacity</Form.Label>
            <Form.Control
              type="number"
              value={time.capacity}
              onChange={(e) => handleTimeChange(index, e)}
              required
            />
          </Form.Group>
          <Form.Group controlId="even_week">
            <Form.Check
              type="checkbox"
              label="Even Week"
              checked={time.even_week}
              onChange={(e) => handleTimeChange(index, e)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {time.isNew ? "Create Time" : "Save Time"}
          </Button>
          {!time.isNew && (
            <Button variant="danger" onClick={() => handleTimeDelete(index)}>
              Delete Time
            </Button>
          )}
        </Form>
      ))}
      <Button variant="secondary" onClick={handleAddTime}>
        Add Time
      </Button>
    </Container>
  );
};

export default SubjectEdit;
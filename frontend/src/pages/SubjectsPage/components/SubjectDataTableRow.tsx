import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../constants";

const dayMapping = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const SubjectDataTableRow = ({
  id,
  code,
  name,
  credits,
  language,
  is_remote,
  facultyName,
}) => {
  const [subjectTimes, setSubjectTimes] = useState([]);
  const [showTimes, setShowTimes] = useState(false);

  useEffect(() => {
    if (showTimes) {
      fetch(`${baseUrl}/subjects/${code}/times`)
        .then((response) => response.json())
        .then((data) => setSubjectTimes(data))
        .catch((error) =>
          console.error("Error fetching subject times:", error)
        );
    }
  }, [showTimes, code]);

  return (
    <>
      <tbody>
        <tr>
          <td style={{ width: "0", whiteSpace: "nowrap" }}>{id}</td>
          <td>{code}</td>
          <td>{name}</td>
          <td>{credits}</td>
          <td>{language}</td>
          <td>{is_remote ? "Yes" : "No"}</td>
          <td>{facultyName}</td>
          <td style={{ width: "0", whiteSpace: "nowrap" }}>
            <Link to={`/grades/${code}/students`}>
              <button type="button" className="btn btn-success edit-button">
                Students
              </button>
            </Link>

            <Link to={`/home/subjects/edit/${code}`}>
              <button
                type="button"
                className="btn btn-outline-danger delete-button"
              >
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => setShowTimes(!showTimes)}
            >
              {showTimes ? "Hide Times" : "Show Times"}
            </button>
            <Link to={`/home/grades/${code}`}>
              <button type="button" className="btn btn-outline-primary">
                View Grades
              </button>
            </Link>
          </td>
        </tr>
        {showTimes && subjectTimes.length > 0 && (
          <tr>
            <td colSpan="8">
              <ul>
                {subjectTimes.map((time) => (
                  <li key={time.id}>
                    {`Time: ${time.hour}h, Day: ${
                      dayMapping[time.day]
                    }, Classroom: ${time.classroom}, Registered Students: ${
                      time.registered_students
                    }/${time.capacity}`}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default SubjectDataTableRow;

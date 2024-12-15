import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../constants";

const dayMapping = {
  1: "Pirmadienis",
  2: "Antradienis",
  3: "Trečiadienis",
  4: "Ketvirtadienis",
  5: "Penktadienis",
  6: "Šeštadienis",
  7: "Sekmadienis",
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
          <td>{is_remote ? "Taip" : "Ne"}</td>
          <td>{facultyName}</td>
          <td style={{ width: "0", whiteSpace: "nowrap" }}>

            <Link to={`/home/subjects/edit/${code}`}>
              <button
                type="button"
                className="btn btn-outline-danger delete-button"
              >
                Redaguoti
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => setShowTimes(!showTimes)}
            >
              {showTimes ? "Slėpti laikus" : "Rodyti laikus"}
            </button>
            <Link to={`/home/grades/${code}/students`}>
              <button type="button" className="btn btn-outline-primary">
                Pažymiai
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
                    {`Laikas: ${time.hour}h, Diena: ${
                      dayMapping[time.day]
                    }, Klasė: ${time.classroom}, Studentų sk.: ${
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
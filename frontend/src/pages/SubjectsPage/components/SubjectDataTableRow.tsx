import { Link } from "react-router-dom";

const SubjectDataTableRow = ({
  id,
  code,
  name,
  credits,
  language,
  isRemote,
}) => {
  return (
    <>
      <tbody>
        <tr>
          <td style={{ width: "0", whiteSpace: "nowrap" }}>{id}</td>
          <td>{code}</td>
          <td>{name}</td>
          <td>{credits}</td>
          <td>{language}</td>
          <td>{isRemote ? "Yes" : "No"}</td>
          <td style={{ width: "0", whiteSpace: "nowrap" }}>
            <Link to={`/grades/${code}`}>
              <button type="button" className="btn btn-success edit-button">
                Students
              </button>
            </Link>
            <Link to={"/subject/edit"}>
              <button
                type="button"
                className="btn btn-outline-danger delete-button"
              >
                Edit
              </button>
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default SubjectDataTableRow;

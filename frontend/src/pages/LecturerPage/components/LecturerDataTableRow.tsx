import { Link } from "react-router-dom";

interface LecturerDataTableRowProps {
  id: number;
  name: string;
  department: string;
  onRemove: (name: string) => void;
}

const LecturerDataTableRow = ({
  id,
  name,
  department,
  onRemove,
}: LecturerDataTableRowProps) => {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{department}</td>
        <td>
          <Link to={"/lecturers/" + id}>
            <button type="button" className="btn btn-success edit-button">
              Details
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger delete-button"
            onClick={() => onRemove(name)}
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

export default LecturerDataTableRow;

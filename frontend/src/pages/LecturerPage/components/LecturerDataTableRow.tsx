import { Link } from "react-router-dom";

interface LecturerDataTableRowProps {
  id: number;
  name: string;
  surname: string;
  username: string;
  phone: string;
  email: string;
  status: string;
  faculty: string;
  address: string;
  gender: string;
  salary: number;
  onRemove: (name: string) => void;
}

const LecturerDataTableRow = ({
  id,
  name,
  surname = "N/A", // Default value
  username = "N/A", // Default value
  phone = "N/A", // Default value
  email = "N/A", // Default value
  status = "N/A", // Default value
  faculty = "N/A", // Default value
  address = "N/A", // Default value
  gender = "N/A", // Default value
  salary = 0, // Default value
  onRemove,
}: LecturerDataTableRowProps) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{username}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{status}</td>
      <td>{faculty}</td>
      <td>{address}</td>
      <td>{gender}</td>
      <td>{`€${salary.toFixed(2)}`}</td>
      <td>
        <Link to={`/lecturers/${id}`}>
          <button type="button" className="btn btn-success">
            Peržiūrėti
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onRemove(name)}
        >
          Pašalinti
        </button>
      </td>
    </tr>
  );
};

export default LecturerDataTableRow;

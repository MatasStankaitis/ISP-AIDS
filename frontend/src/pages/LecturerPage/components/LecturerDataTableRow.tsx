import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

interface LecturerDataTableRowProps {
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

const LecturerDataTableRow = ({
  name,
  surname,
  username,
  phone_number,
  email,
  home_address,
  gender,
  status,
  faculty,
  current_salary,
  onRemove,
}: LecturerDataTableRowProps) => {
  return (
    <tr>
      <td>{username}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{username}</td>
      <td>{phone_number}</td>
      <td>{email}</td>
      <td>{status}</td>
      <td>{faculty}</td>
      <td>{home_address}</td>
      <td>{gender}</td>
      <td>{`€${current_salary.toFixed(2)}`}</td>
      <td>
        <Link to={`/home/lecturers/${username}`}>
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

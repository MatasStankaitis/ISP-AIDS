// frontend/src/pages/DormsPage/RequestManagement/RequestList.tsx
import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { baseUrl } from "../../../constants";
import { FaCheck, FaTimes } from "react-icons/fa";

interface Request {
  id: number;
  title: string;
  typeName: string;
  description: string;
  statusName: string;
  date_created: string;
  studentUsername?: string; // Add studentUsername field
}

interface RequestListProps {
  requests: Request[];
  isAdmin: boolean; // Add isAdmin prop
}


const RequestList: React.FC<RequestListProps> = ({ requests, isAdmin }) => {
  const handleApprove = async (id: number) => {
    try {
      await fetch(`${baseUrl}/dorms/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 2 }),
      });
      // Refresh the requests list
      window.location.reload();
    } catch (error) {
      console.error("Failed to approve request", error);
    }
  };

  const handleDisapprove = async (id: number) => {
    try {
      await fetch(`${baseUrl}/dorms/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: 3 }),
      });
      // Refresh the requests list
      window.location.reload();
    } catch (error) {
      console.error("Failed to disapprove request", error);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {isAdmin && <th>Studento naudotojo vardas</th>} {/* Conditionally render column */}
          <th>Pavadiniams</th>
          <th>Tipas</th>
          <th>Aprašymas</th>
          <th>Statusas</th>
          <th>Sukūrimo data</th>
          {isAdmin && <th>Veiksmai</th>}
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request.id}>
            {isAdmin && <td>{request.fk_Studentusername}</td>} {/* Conditionally render cell */}
            <td>{request.title}</td>
            <td>{request.type}</td>
            <td>{request.description}</td>
            <td>{request.status}</td>
            <td>{request.date_created}</td>
             {isAdmin && (
              <td>
                <Button
                  variant="success"
                  onClick={() => handleApprove(request.id)}
                  disabled={request.statusName === "Approved"}
                >
                <FaCheck /> Patvirtinti
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDisapprove(request.id)}
                  disabled={request.statusName === "Denied"}
                >
                <FaTimes /> Atmesti
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RequestList;
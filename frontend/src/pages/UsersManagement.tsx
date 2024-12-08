import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { baseUrl } from '../constants';

interface User {
  username: string;
  role: string;
  approved: boolean;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/admin/users`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  const handleApprove = async (username: string) => {
    try {
      await fetch(`${baseUrl}/admin/approve-user`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      fetchUsers();
    } catch (err) {
      console.error('Failed to approve user', err);
    }
  };

  const handleDisapprove = async (username: string) => {
    try {
      await fetch(`${baseUrl}/admin/disapprove-user`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      fetchUsers();
    } catch (err) {
      console.error('Failed to disapprove user', err);
    }
  };
  return (
    <div>
      <h2>Vartotųjų valdymas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vartotojo vardas</th>
            <th>Patvirtintas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.approved ? 'Taip' : 'Ne'}</td>
              <td>
                {!user.approved && (
                  <Button variant="success" onClick={() => handleApprove(user.username)}>
                    Patvirtinti
                  </Button>
                )}
                {user.approved && (
                  <Button variant="danger" onClick={() => handleDisapprove(user.username)}>
                    Atmesti
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersManagement;
// frontend/src/pages/auth/Dashboard.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import StudentDashboard from '../StudentDashboard';
import LecturerDashboard from '../LecturerDashboard';
import AdminDashboard from '../AdminDashboard';

const Dashboard: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext?.user) {
    return null;
  }

  switch (authContext.user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'lecturer':
      return <LecturerDashboard />;
    case 'administrator':
      return <AdminDashboard />;
    default:
      return <p>Unknown role</p>;
  }
};

export default Dashboard;
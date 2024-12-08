// frontend/src/pages/UnauthorizedPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Unauthorized Access</h2>
      <p>You do not have permission to view this page.</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default UnauthorizedPage;
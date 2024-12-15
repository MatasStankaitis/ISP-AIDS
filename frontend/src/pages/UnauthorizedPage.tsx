// frontend/src/pages/UnauthorizedPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Neautorizuotas bandymas prisijungti</h2>
      <p>Negalite peržiūrėti šio puslapio.</p>
      <button onClick={() => navigate(-1)}>Grįžti atgal</button>
    </div>
  );
};

export default UnauthorizedPage;
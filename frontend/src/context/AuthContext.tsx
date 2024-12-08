// frontend/src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { baseUrl } from '../constants';

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/check`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to check authentication', err);
      } finally {
        setIsLoading(false); // Set loading to false after check
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Optionally, render a loading indicator here
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
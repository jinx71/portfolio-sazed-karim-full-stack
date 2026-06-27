import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import Loader from './Loader.js';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader label='Checking session' />;
  if (!user) return <Navigate to='/admin/login' replace />;
  return <>{children}</>;
}

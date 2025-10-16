import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ReceiptsList } from '../components/ReceiptsList';
import { CreateReceiptForm } from '../components/CreateReceiptForm';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleReceiptCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Administrador de Recibos
            </h1>
            <p className="text-sm text-gray-600">Bienvenido, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <CreateReceiptForm onSuccess={handleReceiptCreated} />
        <ReceiptsList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

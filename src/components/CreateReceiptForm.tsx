import { useState } from 'react';

import { receiptsService } from '../services/receipts.service';
import type { CreateReceiptData } from '../services/receipts.service';

interface CreateReceiptFormProps {
  onSuccess: () => void;
}

export const CreateReceiptForm = ({ onSuccess }: CreateReceiptFormProps) => {
  const [formData, setFormData] = useState<CreateReceiptData>({
    client: '',
    amount: 0,
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.client.trim()) {
      setError('El nombre del cliente es obligatorio');
      return;
    }

    if (formData.amount <= 0 || isNaN(formData.amount)) {
      setError('El monto debe ser mayor que cero');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const dataToSend: CreateReceiptData = {
        client: formData.client,
        amount: formData.amount,
      };

      if (formData.dueDate) {
        dataToSend.dueDate = formData.dueDate;
      }

      await receiptsService.create(dataToSend);

      setFormData({ client: '', amount: 0, dueDate: '' });
      onSuccess();
    } catch (err) {
      setError('Error al crear el recibo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Crear un Nuevo Recibo</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Cliente *
            </label>
            <input
              id="client"
              type="text"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce el nombre del cliente"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Monto *
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Vencimiento
            </label>
            <input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creando...' : 'Crear Recibo'}
        </button>
      </form>
    </div>
  );
};

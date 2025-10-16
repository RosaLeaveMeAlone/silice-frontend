import { useEffect, useState } from 'react';
import { ReceiptStatus } from '../types/receipt';
import type { Receipt } from '../types/receipt';
import { receiptsService } from '../services/receipts.service';
import { ReceiptsFilters } from './ReceiptsFilters';

interface ReceiptsListProps {
  refreshTrigger?: number;
}

export const ReceiptsList = ({ refreshTrigger }: ReceiptsListProps) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReceiptStatus | ''>('');
  const [filterClient, setFilterClient] = useState('');

  useEffect(() => {
    loadReceipts();
  }, [refreshTrigger]);

  const loadReceipts = async (status?: ReceiptStatus, client?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await receiptsService.getAll(status, client);
      setReceipts(data);
    } catch (err) {
      setError('Error al cargar los recibos');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (status?: ReceiptStatus | '', client?: string) => {
    const statusToUse = status !== undefined ? status : filterStatus;
    const clientToUse = client !== undefined ? client : filterClient;

    loadReceipts(
      statusToUse || undefined,
      clientToUse || undefined
    );
  };

  const handleClearFilters = () => {
    setFilterStatus('');
    setFilterClient('');
    loadReceipts();
  };

  const handleCollect = async (id: string) => {
    try {
      await receiptsService.collect(id);
      await loadReceipts();
    } catch (err) {
      setError('Error al cobrar el recibo');
    }
  };

  const getStatusBadgeColor = (status: ReceiptStatus) => {
    switch (status) {
      case ReceiptStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case ReceiptStatus.COLLECTED:
        return 'bg-green-100 text-green-800';
      case ReceiptStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

    const translateStatus = (status: ReceiptStatus) => {
    const translations: Record<ReceiptStatus, string> = {
      [ReceiptStatus.PENDING]: 'PENDIENTE',
      [ReceiptStatus.COLLECTED]: 'COBRADO',
      [ReceiptStatus.REJECTED]: 'RECHAZADO',
    };
    return translations[status] || status;
  };

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <>
      <ReceiptsFilters
        status={filterStatus}
        client={filterClient}
        onStatusChange={setFilterStatus}
        onClientChange={setFilterClient}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
      <div className="overflow-x-auto animate__animated animate__fadeIn">
        <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Vencimiento
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {receipts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No se encontraron recibos
              </td>
            </tr>
          ) : (
            receipts.map((receipt) => (
              <tr key={receipt._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {receipt.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatAmount(receipt.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(receipt.status)}`}>
                    {translateStatus(receipt.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(receipt.dueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {receipt.status === ReceiptStatus.PENDING && (
                    <button
                      onClick={() => handleCollect(receipt._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cobrar
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  );
};

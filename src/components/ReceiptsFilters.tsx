import { ReceiptStatus } from '../types/receipt';

interface ReceiptsFiltersProps {
  status: ReceiptStatus | '';
  client: string;
  onStatusChange: (status: ReceiptStatus | '') => void;
  onClientChange: (client: string) => void;
  onApplyFilters: (status?: ReceiptStatus | '', client?: string) => void;
  onClearFilters: () => void;
}

export const ReceiptsFilters = ({
  status,
  client,
  onStatusChange,
  onClientChange,
  onApplyFilters,
  onClearFilters,
}: ReceiptsFiltersProps) => {
  const handleStatusChange = (newStatus: ReceiptStatus | '') => {
    onStatusChange(newStatus);
    onApplyFilters(newStatus, client);
  };

  const handleClientKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onApplyFilters(status, client);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Estatus
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as ReceiptStatus | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value={ReceiptStatus.PENDING}>Pendientes</option>
            <option value={ReceiptStatus.COLLECTED}>Cobrados</option>
            <option value={ReceiptStatus.REJECTED}>Rechazados</option>
          </select>
        </div>

        <div>
          <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
            Cliente
          </label>
          <input
            id="client"
            type="text"
            value={client}
            onChange={(e) => onClientChange(e.target.value)}
            onKeyDown={handleClientKeyDown}
            placeholder="Filtrar por nombre del cliente"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={() => onApplyFilters(status, client)}
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Filtrar
          </button>
          <button
            onClick={onClearFilters}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

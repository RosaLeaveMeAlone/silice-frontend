import { api } from './api';
import { ReceiptStatus } from '../types/receipt';
import type { Receipt } from '../types/receipt';

export interface CreateReceiptData {
  client: string;
  amount: number;
  dueDate?: string;
}

export const receiptsService = {
  create: async (data: CreateReceiptData): Promise<Receipt> => {
    const response = await api.post<Receipt>('/receipts', data);
    return response.data;
  },

  getAll: async (status?: ReceiptStatus, client?: string): Promise<Receipt[]> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (client) params.append('client', client);

    const response = await api.get<Receipt[]>(`/receipts?${params.toString()}`);
    return response.data;
  },

  collect: async (id: string): Promise<Receipt> => {
    const response = await api.patch<Receipt>(`/receipts/${id}/collect`);
    return response.data;
  },
};

export enum ReceiptStatus {
  PENDING = 'pending',
  COLLECTED = 'collected',
  REJECTED = 'rejected',
}

export interface Receipt {
  _id: string;
  client: string;
  amount: number;
  status: ReceiptStatus;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

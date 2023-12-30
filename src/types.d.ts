export interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
}

export type ApiTrans = Omit<Transaction, "id">;

export interface TransactionsList {
  [id: string]: ApiTrans;
}

export interface Category {
  id: string;
  name: string;
  type: string;
}

export type ApiCategory = Omit<Category, "id">;

export interface CategoriesList {
  [id: string]: ApiCategory;
}


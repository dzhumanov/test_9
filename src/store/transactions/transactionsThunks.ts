import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiTrans, Transaction, TransactionsList } from "../../types";
import { AppDispatch } from "../../app/store";
import axiosApi from "../../axiosApi";

export const fetchTransactions = createAsyncThunk<
  Transaction[],
  undefined,
  { dispatch: AppDispatch }
>("transactions/fetchAll", async () => {
  const transactionsResponse = await axiosApi.get<TransactionsList | null>(
    "/transactions.json"
  );
  const transactions = transactionsResponse.data;
  let newTransactions: Transaction[] = [];

  if (transactions) {
    newTransactions = Object.keys(transactions)
      .filter((key) => transactions[key] !== null)
      .map((key) => {
        const transaction = transactions[key];
        return {
          ...transaction,
          id: key,
        };
      });
  }

  return newTransactions;
});

export const createTransaction = createAsyncThunk<void, ApiTrans>(
  "transactions/create",
  async (transaction) => {
    await axiosApi.post("/transactions.json", transaction);
  }
);

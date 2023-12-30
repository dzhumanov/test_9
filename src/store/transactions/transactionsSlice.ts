import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../types";
import { fetchTransactions } from "./transactionsThunks";
import { RootState } from "../../app/store";

interface TransactionsState {
  transactions: Transaction[];
  fetchLoading: boolean;
  modalStatus: boolean;
  createLoading: boolean;
}

const initialState: TransactionsState = {
  transactions: [],
  fetchLoading: false,
  modalStatus: false,
  createLoading: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalStatus = !state.modalStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchTransactions.fulfilled,
      (state, { payload: items }) => {
        state.fetchLoading = false;
        state.transactions = items;
      }
    );
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
export const { toggleModal } = transactionsSlice.actions;

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;
export const selectTransactionsLoading = (state: RootState) =>
  state.transactions.fetchLoading;
export const selectModal = (state: RootState) => state.transactions.modalStatus;
export const createLoading = (state: RootState) => state.transactions.createLoading;

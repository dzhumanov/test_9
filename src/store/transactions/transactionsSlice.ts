import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "../../types";
import { fetchTransactions } from "./transactionsThunks";
import { RootState } from "../../app/store";

interface TransactionsState {
    transactions: Transaction[];
    fetchLoading: boolean;
}

const initialState: TransactionsState = {
    transactions: [],
    fetchLoading: false,
}

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, {payload: items}) => {
            state.fetchLoading = false;
            state.transactions = items;
        });
        builder.addCase(fetchTransactions.rejected, (state) => {
            state.fetchLoading = false;
        });
    }
})

export const transactionsReducer = transactionsSlice.reducer;

export const selectTransactions = (state: RootState) => state.transactions.transactions;
export const selectTransactionsLoading = (state: RootState) => state.transactions.fetchLoading;
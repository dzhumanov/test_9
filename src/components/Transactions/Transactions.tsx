import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import {
  selectTransactions,
  selectTransactionsLoading,
} from "../../store/transactions/transactionsSlice";
import { fetchTransactions } from "../../store/transactions/transactionsThunks";
import Spinner from "../Spinner/Spinner";
import OneTransaction from "./OneTransaction";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const transactionsLoading = useAppSelector(selectTransactionsLoading);

  useEffect(() => {
    void dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <>
      <h1>Transactions:</h1>
      <div>
        {transactionsLoading ? (
          <Spinner />
        ) : (
          transactions.map((transaction) => (
            <OneTransaction key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </>
  );
};

export default Transactions;

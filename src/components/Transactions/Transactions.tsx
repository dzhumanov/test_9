import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import {
  selectDeleteLoading,
  selectTransactions,
  selectTransactionsLoading,
  toggleModal,
} from "../../store/transactions/transactionsSlice";
import {
  deleteTransaction,
  fetchTransactions,
} from "../../store/transactions/transactionsThunks";
import Spinner from "../Spinner/Spinner";
import OneTransaction from "./OneTransaction";

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const transactionsLoading = useAppSelector(selectTransactionsLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);

  useEffect(() => {
    void dispatch(fetchTransactions());
  }, [dispatch]);

  const onClick = () => {
    dispatch(toggleModal());
  };

  const removeTransaction = async (id: string) => {
    await dispatch(deleteTransaction(id));
    await dispatch(fetchTransactions());
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h1>Transactions:</h1>
        <button className="btn btn-success" onClick={onClick}>
          Add
        </button>
      </div>
      <div>
        {transactionsLoading ? (
          <Spinner />
        ) : (
          transactions.map((transaction) => (
            <OneTransaction
              key={transaction.id}
              transaction={transaction}
              onDelete={() => removeTransaction(transaction.id)}
              deleteLoading={deleteLoading}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Transactions;

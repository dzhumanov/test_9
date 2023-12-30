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

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalAmount = transactions.reduce((total, transaction) => {
    const amount = parseFloat(transaction.amount);
    return transaction.type === "income" ? total + amount : total - amount;
  }, 0);

  return (
    <>
      <div className="d-flex justify-content-between mt-3 text-align-center">
        <h1 className="m-0">Transactions:</h1>
        <p className="fs-2 fw-bold text-success m-0">
          Total: {totalAmount} KGS
        </p>
        <button className="btn btn-success" onClick={onClick}>
          Add
        </button>
      </div>
      <div className="mt-3">
        {transactionsLoading ? (
          <Spinner />
        ) : (
          sortedTransactions.map((transaction) => (
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

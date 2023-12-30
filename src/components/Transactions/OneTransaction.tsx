import React, { useEffect, useState } from "react";
import { Category, Transaction } from "../../types";
import axiosApi from "../../axiosApi";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  transaction: Transaction;
  onDelete: React.MouseEventHandler;
  deleteLoading: boolean | string;
}

const OneTransaction: React.FC<Props> = ({
  transaction,
  onDelete,
  deleteLoading,
}) => {
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosApi.get(
          `categories/${transaction.category}.json`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [transaction.category]);

  return (
    <>
      {category ? (
        <div className="d-flex align-items-center">
          <h4>{category.name}</h4>
          <p>
            {category.type === "income" ? (
              <strong>+</strong>
            ) : category.type === "expense" ? (
              <strong>-</strong>
            ) : null}
            {transaction.amount} KGS
          </p>
          <p>Date: {transaction.date}</p>
          <div className="btn-wrapper d-flex gap-3 ms-auto">
            <button className="btn btn-success" onClick={onDelete}>
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={onDelete}
              disabled={
                deleteLoading ? deleteLoading === transaction.id : false
              }
            >
              {deleteLoading && deleteLoading === transaction.id && (
                <ButtonSpinner />
              )}
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default OneTransaction;

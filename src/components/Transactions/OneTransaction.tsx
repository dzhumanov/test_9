import React, { useEffect, useState } from "react";
import { Category, Transaction } from "../../types";
import axiosApi from "../../axiosApi";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import dayjs from "dayjs";

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

  let color;
  if (category && category.type === "income") {
    color = "text-success";
  } else if (category && category.type === "expense") {
    color = "text-danger";
  }

  return (
    <>
      {category ? (
        <div className="d-flex align-items-center mb-2">
          <h4 className="m-0 ">{category.name}</h4>
          <p className={`m-0 ms-3 fs-4 ${color}`}>
            {category.type === "income" ? (
              <img
                src="https://freesvg.org/img/primary-tab-new.png"
                alt=""
                style={{ width: "30px" }}
              />
            ) : category.type === "expense" ? (
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Red-Minus-PNG-File.png"
                alt=""
                style={{ width: "30px" }}
              />
            ) : null}
            {transaction.amount} KGS
          </p>
          <p className="m-0 ms-auto">
            Date:{" "}
            <span>{dayjs(transaction.date).format("DD.MM.YYYY HH:mm:ss")}</span>
          </p>
          <div className="btn-wrapper d-flex gap-3 ms-3">
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

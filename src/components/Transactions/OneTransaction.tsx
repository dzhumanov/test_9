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
        <div className="row mb-2">
          <div className="col-2">
            <h4 className="m-0">{category.name}</h4>
          </div>
          <div className={`m-0 fs-4 col-3 ${color}`}>
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
          </div>
          <div className="m-0 col-4">
            Date: {dayjs(transaction.date).format("DD.MM.YYYY HH:mm:ss")}
          </div>
          <div className="btn-wrapper col-3 d-flex gap-3">
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

import React, { useEffect, useState } from "react";
import { Category, Transaction } from "../../types";
import axiosApi from "../../axiosApi";

interface Props {
  transaction: Transaction;
}

const OneTransaction: React.FC<Props> = ({ transaction }) => {
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

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <p>
        {category.type === "income" ? (
          <strong>+</strong>
        ) : category.type === "expense" ? (
          <strong>-</strong>
        ) : null}
        {transaction.amount} KGS
      </p>

      <p>Date: {transaction.date}</p>
    </div>
  );
};

export default OneTransaction;

import React, { useState } from "react";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { ApiTrans } from "../../types";

const initialState: ApiTrans = {
  category: '',
  amount: 0,
  date: '',
};

interface Props {
  onSubmit: (transaction: ApiTrans) => void;
  existingTrans?: ApiTrans;
  isEdit?: boolean;
  isLoading?: boolean;
}

const Form: React.FC<Props> = ({
  onSubmit,
  existingTrans = initialState,
  isEdit = false,
  isLoading = false,
}) => {
  const [trans, setTrans] = useState<ApiTrans>(existingTrans);

  const changeTrans = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTrans((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    const now = new Date();
    const createdAt= now.toISOString();

    onSubmit({
      ...trans,
      date: createdAt,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? "Edit transaction" : "Add new transaction"}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select name="type" id="name" className="form-control" onChange={changeTrans}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select name="category" id="category" className="form-control" onChange={changeTrans}>
            {}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          className="form-control"
          value={trans.amount}
          onChange={changeTrans}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isLoading}
      >
        {isLoading && <ButtonSpinner />}
        {isEdit ? "Edit" : "Create"}
      </button>
    </form>
  );
};

export default Form;

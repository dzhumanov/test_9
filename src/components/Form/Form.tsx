import React, { useEffect, useState } from "react";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { ApiTrans, FormTrans } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { selectCategories } from "../../store/categories/categoriesSlice";
import { fetchCategories } from "../../store/categories/categoriesThunks";
import { toggleModal } from "../../store/transactions/transactionsSlice";

const initialState: FormTrans = {
  category: "",
  amount: 0,
  date: "",
  type: "",
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
  const [trans, setTrans] = useState<FormTrans>(existingTrans);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

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
    const createdAt = now.toISOString();

    onSubmit({
      ...trans,
      date: createdAt,
    });
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleModal());
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? "Edit transaction" : "Add new transaction"}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          id="name"
          className="form-control"
          onChange={changeTrans}
        >
            <option value="">Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          className="form-control"
          onChange={changeTrans}
        >
          <option value="">Select category</option>
          {categories
            .filter((category) => category.type === trans.type)
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
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
      <button className="btn btn-danger mt-2 ms-2" onClick={closeModal}>
        Cancel
      </button>
    </form>
  );
};

export default Form;

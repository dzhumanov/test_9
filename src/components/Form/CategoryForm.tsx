import React, { useState } from "react";
import { ApiCategory } from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import { toggleCategoriesModal } from "../../store/categories/categoriesSlice";
import { useAppDispatch } from "../../app/Hooks";

const initialState: ApiCategory = {
  name: "",
  type: "",
};

interface Props {
  onSubmit: (category: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isEdit?: boolean;
  isLoading?: boolean;
}

const CategoryForm: React.FC<Props> = ({
  onSubmit,
  existingCategory = initialState,
  isEdit = false,
  isLoading = false,
}) => {
  const [category, setCategory] = useState<ApiCategory>(existingCategory);
  const dispatch = useAppDispatch();

  const changeCategory = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    onSubmit({
      ...category,
    });
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(toggleCategoriesModal());
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h4>{isEdit ? "Edit category" : "Add new category"}</h4>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="name"
            className="form-control"
            onChange={changeCategory}
          >
            <option value="">Select type    </option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={category.name}
            onChange={changeCategory}
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
    </div>
  );
};

export default CategoryForm;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

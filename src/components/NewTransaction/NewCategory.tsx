import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import {
  createLoading,
} from "../../store/transactions/transactionsSlice";
import {
  createCategory,
  fetchCategories,
} from "../../store/categories/categoriesThunks";
import { ApiCategory } from "../../types";
import CategoryForm from "../Form/CategoryForm";
import { toggleCategoriesModal } from "../../store/categories/categoriesSlice";

const NewCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(createLoading);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(createCategory(category));
    await dispatch(fetchCategories());
    await dispatch(toggleCategoriesModal());
  };

  return (
    <>
      <CategoryForm onSubmit={onSubmit} isLoading={loading} />
    </>
  );
};

export default NewCategory;

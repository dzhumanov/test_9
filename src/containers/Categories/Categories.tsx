import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import {
  selectCategories,
  selectCategoriesDelete,
  selectCategoriesLoading,
  selectCategoriesModal,
  toggleCategoriesModal,
} from "../../store/categories/categoriesSlice";
import {
  deleteCategory,
  fetchCategories,
} from "../../store/categories/categoriesThunks";
import Spinner from "../../components/Spinner/Spinner";
import OneCategory from "./OneCategory";
import Modal from "../../components/Modal/Modal";
import NewCategory from "../../components/NewTransaction/NewCategory";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const deleteLoading = useAppSelector(selectCategoriesDelete);
  const showModal = useAppSelector(selectCategoriesModal);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const onClick = () => {
    dispatch(toggleCategoriesModal());
  };

  const removeCategory = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories());
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (a.type === "income" && b.type === "expense") {
      return -1;
    } else if (a.type === "expense" && b.type === "income") {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h1>Category list:</h1>
        <button className="btn btn-success" onClick={onClick}>
          Add new category
        </button>
      </div>
      <div className="mt-3">
        {categoriesLoading ? (
          <Spinner />
        ) : (
          sortedCategories.map((category) => (
            <OneCategory
              key={category.id}
              category={category}
              onDelete={() => removeCategory(category.id)}
              deleteLoading={deleteLoading}
            />
          ))
        )}
      </div>
      <Modal show={showModal} title="Category form">
        <div className="modal-body">
          <NewCategory />
        </div>
      </Modal>
    </>
  );
};

export default Categories;

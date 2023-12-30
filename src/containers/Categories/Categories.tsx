import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import {
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesModal,
  toggleCategoriesModal,
} from "../../store/categories/categoriesSlice";
import { fetchCategories } from "../../store/categories/categoriesThunks";
import Spinner from "../../components/Spinner/Spinner";
import OneCategory from "./OneCategory";
import Modal from "../../components/Modal/Modal";
import NewCategory from "../../components/NewTransaction/NewCategory";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const showModal = useAppSelector(selectCategoriesModal);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const onClick = () => {
    dispatch(toggleCategoriesModal());
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <h1>Category list:</h1>
        <button className="btn btn-success" onClick={onClick}>
          Add new category
        </button>
      </div>
      <div>
        {categoriesLoading ? (
          <Spinner />
        ) : (
          categories.map((category) => (
            <OneCategory key={category.id} category={category} />
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
function toggleCategoryModal(): any {
  throw new Error("Function not implemented.");
}

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import {
  selectCategories,
  selectCategoriesLoading,
} from "../../store/categories/categoriesSlice";
import { fetchCategories } from "../../store/categories/categoriesThunks";
import Spinner from "../../components/Spinner/Spinner";
import OneCategory from "./OneCategory";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  console.log(categories);

  return (
    <div>
      {categoriesLoading ? (
        <Spinner />
      ) : (
        categories.map((category) => (
          <OneCategory key={category.id} category={category} />
        ))
      )}
    </div>
  );
};

export default Categories;

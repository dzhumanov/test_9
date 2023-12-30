import { createAsyncThunk } from "@reduxjs/toolkit";
import {CategoriesList, Category } from "../../types";
import axiosApi from "../../axiosApi";
import { AppDispatch } from "../../app/store";

export const fetchCategories = createAsyncThunk<
  Category[],
  undefined,
  { dispatch: AppDispatch }
>("categories/fetchAll", async () => {
  const categoriesResponse = await axiosApi.get<CategoriesList | null>(
    "/categories.json"
  );
  const categories = categoriesResponse.data;
  let newCategories: Category[] = [];

  if (categories) {
    newCategories = Object.keys(categories).map((key) => {
      const category = categories[key];
      return {
        ...category,
        id: key,
      };
    });
  }

  return newCategories;
});

// export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
//   "categories/fetchOne",
//   async (id) => {
//     const response = await axiosApi.get<ApiCategory | null>(
//       "/categories/" + id + ".json"
//     );
//     const category = response.data;

//     if (category === null) {
//       throw new Error("404! Not found!");
//     }

//     return category;
//   }
// );

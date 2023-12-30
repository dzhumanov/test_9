import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types"
import { fetchCategories} from "./categoriesThunks";
import { RootState } from "../../app/store";

interface CategoriesState {
    categories: Category[];
    categoriesLoading: boolean;
}

const initialState:CategoriesState = {
    categories: [],
    categoriesLoading: false,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.categoriesLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, {payload: items}) => {
            state.categoriesLoading = false;
            state.categories = items;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.categoriesLoading = false;
        });
    }
})

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.categoriesLoading; 
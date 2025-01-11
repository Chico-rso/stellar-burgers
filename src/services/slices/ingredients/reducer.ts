import {
  createAsyncThunk,
  createSlice,
  createSelector
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IBurgerIngredients {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: IBurgerIngredients = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients,
    selectBun: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMain: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauce: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'ingredients error';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  selectIsLoading,
  selectIngredients,
  selectBun,
  selectMain,
  selectSauce
} = burgerIngredientsSlice.selectors;

export const selectAllIngredients = createSelector(
  [(state) => state.ingredients.ingredients],
  (ingredients) => ingredients
);

export default burgerIngredientsSlice.reducer;

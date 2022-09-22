import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favouriteItems: [],
  totalFavouriteitems: 0,
};

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addFavouriteItem(state, action) {
      let updatedFavouriteItem = [];
      updatedFavouriteItem = state.favouriteItems.concat({
        id: action.payload,
      });
      return {
        favouriteItems: updatedFavouriteItem,
        totalFavouriteitems: updatedFavouriteItem.length,
      };
    },
    removeFavouriteItem(state, action) {
      let updatedFavouriteItem = state.favouriteItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        favouriteItems: updatedFavouriteItem,
        totalFavouriteitems: updatedFavouriteItem.length,
      };
    },
    itemIsFavourite(state, action) {
      if (state.favouriteItems.length > 0)
        return state.favouriteItems.some((item) => item.id === action.payload);
    },
  },
});

export default favSlice.reducer;
export const favActions = favSlice.actions;

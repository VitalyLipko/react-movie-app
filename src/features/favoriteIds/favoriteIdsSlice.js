import { createSlice } from '@reduxjs/toolkit';
import { FAVORITES_STORAGE_KEY } from '../../environments';

export const favoriteIdsSlice = createSlice({
  name: 'favoriteIds',
  initialState: {
    value: JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY)) || [],
  },
  reducers: {
    changeStatus: (state, action) => {
      if (state.value.includes(action.payload)) {
        state.value = state.value.filter((id) => id !== action.payload);
      } else {
        state.value.push(action.payload);
      }
    },
  },
});

export const selectFavoriteIds = (state) => state.favoriteIds.value;
export const { changeStatus } = favoriteIdsSlice.actions;
export default favoriteIdsSlice.reducer;

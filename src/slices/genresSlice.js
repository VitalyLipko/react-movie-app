import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGenres } from '../adapters';

export const getGenresThunkFunction = createAsyncThunk(
  'genres/getGenres',
  async () => {
    const res = await getGenres();
    return res.genres;
  },
);
export const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    value: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getGenresThunkFunction.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const selectGenres = (state) => state.genres.value;
export default genresSlice.reducer;

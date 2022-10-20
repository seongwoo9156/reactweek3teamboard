import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comment: {
    id: -1,
    post: "",
    password: "",
    author: "",
    content: "",
  },
  isLoading: true,
  error: null,
};

export const __getComments = createAsyncThunk(
  "comments/getcomments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/comments/`
      );
      return thunkAPI.fulfillWithValue(
        data.data.filter((e) => e.post == payload)
      );
    } catch (error) {
      console.log(`__getPosts Error!! ${error}`);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [__getComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;

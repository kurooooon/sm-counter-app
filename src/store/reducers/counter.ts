import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const asyncIncrement = createAsyncThunk(
  "counter/asyncIncrement",
  async () => {
    console.log("wait 3 sec...");
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    console.log("after 3 sec");
    return 1;
  }
);

export const slice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    reset: (state) => (state = 0),
  },
  extraReducers: (builder) => {
    builder.addCase(
      asyncIncrement.fulfilled,
      (state, action) => state + action.payload
    );
  },
});

const counterReducer = slice.reducer;
export { counterReducer };

export const { increment, decrement, reset } = slice.actions;

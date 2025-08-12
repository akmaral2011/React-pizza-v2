import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkApi) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://684672cd7dbda7ee7aaf0e63.mockapi.io/items?page=${currentPage}&limit=4${
        category ? `&${category}` : ""
      }&sortBy=${sortBy}${search ? `&${search}` : ""}&order=${order}`
    );
    // return data
    if(data.length){
      return thunkApi.rejectWithValue("Pizza is empty")
    }
    return thunkApi.fulfillWithValue(data);
  }
);

const initialState = {
  items: [],
  status: "", //loading //success //error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
      
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        console.log(action,"fulfilled");
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state,action) => {
        console.log(action,"rejected");
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

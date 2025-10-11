import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for your backend
const API_URL = "http://localhost:5000/api/categorylist";

// 🧩 Fetch all category lists
export const fetchCategoryLists = createAsyncThunk(
  "categoryList/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category lists"
      );
    }
  }
);

// 🧩 Create a new category list (with image upload)
export const createCategoryList = createAsyncThunk(
  "categoryList/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category list"
      );
    }
  }
);

// 🧩 Delete a category list
export const deleteCategoryList = createAsyncThunk(
  "categoryList/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      return id; // return deleted id to remove from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category list"
      );
    }
  }
);

const categoryListSlice = createSlice({
  name: "categoryList",
  initialState: {
    lists: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCategoryLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchCategoryLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create new
      .addCase(createCategoryList.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.lists.push(action.payload.newCategoryList);
      })
      .addCase(createCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategoryList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((item) => item._id !== action.payload);
      });
  },
});

export default categoryListSlice.reducer;

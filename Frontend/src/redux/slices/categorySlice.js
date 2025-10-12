// redux/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

// ✅ Add Category
// Add Category
export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async ({ nameEn, nameFa }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      const { data } = await axios.post(API_URL, { nameEn, nameFa }, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding category"
      );
    }
  }
);

// ✅ Fetch All Categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      };
      const { data } = await axios.get(API_URL, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching categories"
      );
    }
  }
);

// ✅ Update Category
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, nameEn, nameFa }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
      const { data } = await axios.put(
        `${API_URL}/${id}`,
        { nameEn, nameFa },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating category"
      );
    }
  }
);

// ✅ Delete Category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      };
      await axios.delete(`${API_URL}/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting category"
      );
    }
  }
);

// ✅ Slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCategoryState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.success = true;
        state.categories = state.categories.map((cat) =>
          cat._id === action.payload._id ? action.payload : cat
        );
      })

      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.success = true;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
      });
  },
});

export const { resetCategoryState } = categorySlice.actions;
export default categorySlice.reducer;

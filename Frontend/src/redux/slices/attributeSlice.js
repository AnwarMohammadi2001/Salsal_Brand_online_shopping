import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/attributes";

// ✅ Add new attribute
export const addAttribute = createAsyncThunk(
  "attributes/addAttribute",
  async (attributeData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(API_URL, attributeData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Add failed");
    }
  }
);

// ✅ Fetch attributes by category
export const fetchAttributesByCategory = createAsyncThunk(
  "attributes/fetchAttributesByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `${API_URL}/category/${categoryId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

// ✅ Delete attribute
export const deleteAttribute = createAsyncThunk(
  "attributes/deleteAttribute",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// ✅ Update attribute
export const updateAttribute = createAsyncThunk(
  "attributes/updateAttribute",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`${API_URL}/${id}`, data, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const attributeSlice = createSlice({
  name: "attributes",
  initialState: {
    attributes: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetAttributeState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addAttribute.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.attributes.push(action.payload);
      })
      .addCase(addAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchAttributesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttributesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload;
      })
      .addCase(fetchAttributesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAttribute.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = state.attributes.filter(
          (attr) => attr._id !== action.payload
        );
      })
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAttribute.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAttribute.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = state.attributes.map((attr) =>
          attr._id === action.payload._id ? action.payload : attr
        );
      })
      .addCase(updateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAttributeState } = attributeSlice.actions;
export default attributeSlice.reducer;

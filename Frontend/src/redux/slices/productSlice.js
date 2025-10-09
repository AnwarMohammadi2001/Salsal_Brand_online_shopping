import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// ✅ Add product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post(API_URL, productData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Add failed");
    }
  }
);

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
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

// ✅ Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.put(`${API_URL}/${id}`, productData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    successAdd: false,
    successUpdate: false,
    successDelete: false,
  },
  reducers: {
    resetAddProduct: (state) => {
      state.loading = false;
      state.error = null;
      state.successAdd = false;
    },
    resetUpdateProduct: (state) => {
      state.loading = false;
      state.error = null;
      state.successUpdate = false;
    },
    resetDeleteProduct: (state) => {
      state.loading = false;
      state.error = null;
      state.successDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successAdd = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successAdd = true;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successAdd = false;
      })

      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successDelete = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successDelete = true;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successDelete = false;
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successUpdate = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successUpdate = true;
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successUpdate = false;
      });
  },
});

export const { resetAddProduct, resetUpdateProduct, resetDeleteProduct } =
  productSlice.actions;
export default productSlice.reducer;

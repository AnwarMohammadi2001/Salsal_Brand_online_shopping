import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/sliders";

// Fetch sliders
export const fetchSliders = createAsyncThunk("slider/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add new slider
export const addSlider = createAsyncThunk(
  "slider/add",
  async ({ image, category }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("category", category);

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.newSlider;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

// Delete slider
export const deleteSlider = createAsyncThunk("slider/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addSlider.fulfilled, (state, action) => {
        state.sliders.push(action.payload);
      })

      // Delete
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.sliders = state.sliders.filter((s) => s._id !== action.payload);
      });
  },
});

export default sliderSlice.reducer;

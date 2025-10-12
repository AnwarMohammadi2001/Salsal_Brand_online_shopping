import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../../api/api";
import { toast } from "react-toastify";

// ------------------ Register ------------------
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      toast.success("ثبت نام با موفقیت انجام شد!");
      return response;
    } catch (error) {
      const message = error.response?.data || "خطا در ثبت نام";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ------------------ Login ------------------
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);

      // ✅ Save user info and token
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      toast.success("ورود با موفقیت انجام شد!");
      return response;
    } catch (error) {
      const message = error.response?.data || "خطا در ورود";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ------------------ Initial State ------------------
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// ------------------ Slice ------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      // ✅ Remove user & token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // ✅ Trigger event to clear user cart
      const logoutEvent = new CustomEvent("userLoggedOut");
      window.dispatchEvent(logoutEvent);

      toast.info("خروج انجام شد");
    },
  },
  extraReducers: (builder) => {
    builder
      // ------------------ Register ------------------
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ------------------ Login ------------------
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // ✅ Save again for safety
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);

        // ✅ Trigger cart load for this user
        const loginEvent = new CustomEvent("loadUserCart");
        window.dispatchEvent(loginEvent);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

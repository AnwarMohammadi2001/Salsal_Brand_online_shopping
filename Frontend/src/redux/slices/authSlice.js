// redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../../api/api";
import { toast } from "react-toastify";
import { loadCartForCurrentUser, clearCart } from "./cartSlice";
import { loadWishlistForCurrentUser, clearWishlist } from "./wishlistSlice";

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
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      const { user, token } = response;

      // ✅ ذخیره در localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          user,
          token,
        })
      );
      localStorage.setItem("token", token);

      // ✅ بعد از لاگین، cart کاربر را بارگذاری کن
      dispatch(loadCartForCurrentUser());
      dispatch(loadWishlistForCurrentUser());

      toast.success("ورود با موفقیت انجام شد!");
      return response;
    } catch (error) {
      const message = error.response?.data || "خطا در ورود";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ------------------ Logout ------------------
// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { dispatch }) => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser?.user?._id || storedUser?._id) {
//       const userId = storedUser.user?._id || storedUser._id;
//       localStorage.removeItem(`cart_${userId}`);
//     }

//     localStorage.removeItem("user");
//     localStorage.removeItem("token");

//     dispatch(clearCart());
//     dispatch(clearWishlist());

//     toast.info("خروج انجام شد");
//   }
// );
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    // Remove only user session, not their cart/wishlist
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Clear Redux state
    dispatch(clearCart());
    dispatch(clearWishlist());

    toast.info("خروج انجام شد");
  }
);


// ------------------ Initial State ------------------
const initialState = {
  user: JSON.parse(localStorage.getItem("user"))?.user || null,
  token: JSON.parse(localStorage.getItem("user"))?.token || null,
  loading: false,
  error: null,
};

// ------------------ Slice ------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ------------------ Logout ------------------
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;

// redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ✅ Helper: ساخت کلید مخصوص هر کاربر
const getCartKey = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) return null;

  const user =
    storedUser._id || storedUser.email ? storedUser : storedUser.user || null;

  if (!user) return null;
  return `cart_${user._id || user.email}`;
};

// ✅ Load user cart from localStorage
const loadUserCart = () => {
  const key = getCartKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
};

// ✅ Save user cart to localStorage
const saveUserCart = (cartItems) => {
  const key = getCartKey();
  if (key) localStorage.setItem(key, JSON.stringify(cartItems));
};

const initialState = {
  cartItems: loadUserCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const key = getCartKey();
      if (!key) {
        alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        return;
      }
      const product = action.payload;
      const existing = state.cartItems.find((item) => item._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      saveUserCart(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      saveUserCart(state.cartItems);
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) item.quantity += 1;
      saveUserCart(state.cartItems);
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveUserCart(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveUserCart([]);
    },

    loadCartForCurrentUser: (state) => {
      state.cartItems = loadUserCart();
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  loadCartForCurrentUser,
} = cartSlice.actions;

export default cartSlice.reducer;

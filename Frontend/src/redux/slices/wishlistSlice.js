import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return [];
    const saved = localStorage.getItem(`wishlist_${user._id || user.email}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;
  localStorage.setItem(
    `wishlist_${user._id || user.email}`,
    JSON.stringify(wishlist)
  );
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((i) => i._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

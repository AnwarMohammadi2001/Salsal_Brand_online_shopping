import { createSlice } from "@reduxjs/toolkit";

// ------------------ Helper Functions ------------------
const getCurrentUser = () => {
  try {
    const data = JSON.parse(localStorage.getItem("user"));
    return data?.user || data || null;
  } catch {
    return null;
  }
};

const getWishlistKey = () => {
  const user = getCurrentUser();
  return user ? `wishlist_${user._id || user.email}` : null;
};

const loadWishlistFromStorage = () => {
  try {
    const key = getWishlistKey();
    if (!key) return [];
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  const key = getWishlistKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(wishlist));
};

// ------------------ Slice ------------------
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
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
  },
});

// ------------------ Actions ------------------
export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlist } =
  wishlistSlice.actions;

// ------------------ Thunks ------------------

// ✅ Load wishlist for current user (used after login)
export const loadWishlistForCurrentUser = () => (dispatch) => {
  const key = getWishlistKey();
  if (!key) {
    dispatch(clearWishlist());
    return;
  }
  const saved = localStorage.getItem(key);
  const items = saved ? JSON.parse(saved) : [];
  dispatch(setWishlist(items));
};

export default wishlistSlice.reducer;

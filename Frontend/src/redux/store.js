import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import categoryReducer from "./slices/categorySlice";
import attributeReducer from "./slices/attributeSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    categories: categoryReducer,
    attributes: attributeReducer,
    products: productReducer, // renamed for consistency
    // addProduct: productReducer, // for add product state
  },
});

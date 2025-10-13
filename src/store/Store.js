const { configureStore } = require("@reduxjs/toolkit");
import contextReducer from "./contextSlice";
import authReducer from "./authSlice";

export const Store = configureStore({
  reducer: {
    context: contextReducer,
    auth: authReducer,
  },
});

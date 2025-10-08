const { configureStore } = require("@reduxjs/toolkit");
import contextReducer from "./contextSlice";

export const Store = configureStore({
  reducer: {
    context: contextReducer,
  },
});

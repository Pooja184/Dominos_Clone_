import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";

// Define Root State type (optional but recommended)
export const store = configureStore({
  reducer: {
    // auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

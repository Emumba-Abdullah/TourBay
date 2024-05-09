import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const authStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof authStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof authStore.dispatch;

export default authStore;

import { configureStore } from "@reduxjs/toolkit";

import posts from "../modules/postsSlice";
import comments from "../modules/commentSlice";

const store = configureStore({
  reducer: { posts: posts, comments, comments },
  devTools: process.env.NODE_ENV !== 'production'
}, );

export default store;

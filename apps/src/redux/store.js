import { configureStore } from "@reduxjs/toolkit";
import cms from "./slices/cms";

const reduxStore = configureStore({
  reducer: {
    cms,
  },
});

export default reduxStore;

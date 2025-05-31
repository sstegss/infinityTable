import { configureStore } from "@reduxjs/toolkit";
import submitReducer from "./submited/submitSlice";
const store = configureStore({
  reducer: {
    submit: submitReducer,
  },
});
export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

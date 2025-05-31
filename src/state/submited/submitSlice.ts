import { createSlice } from "@reduxjs/toolkit";

interface SubmitState {
  value: boolean;
}

const initialState: SubmitState = {
  value: false,
};

const submitedSlice = createSlice({
  name: "submited",
  initialState: initialState,
  reducers: {
    setTrue: (state) => {
      state.value = true;
    },
    setFalse: (state) => {
      state.value = false;
    },
  },
});
export const { setTrue, setFalse } = submitedSlice.actions;

export default submitedSlice.reducer;

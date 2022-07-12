import { createSlice } from "@reduxjs/toolkit";

export const cms = createSlice({
  name: "cms",
  initialState: {
    value: false, // default state
  },
  reducers: {
    // reducers action
    setCms: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { setCms } = cms.actions;
export default cms.reducer;

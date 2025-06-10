import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState { value: number }
const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: "lab4Counter",
  initialState,
  reducers: {
    increment(state)          { state.value += 1; },
    decrement(state)          { state.value -= 1; },
    reset(state)              { state.value  = 0; },
    set(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, reset, set } = counterSlice.actions;
export default counterSlice.reducer;

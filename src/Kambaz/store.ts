import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import coursesReducer from "./Courses/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentReducer from "./enrollmentReducer";
import counterReducer from "../Labs/Lab4/counterSlice";
const store = configureStore({
  reducer: {
    accountReducer,
    coursesReducer,
    modulesReducer,
    assignmentsReducer,
    enrollmentReducer,
     counter: counterReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

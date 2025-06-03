import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import rawCourses from "../Database/courses.json"; 

export interface Course {
  _id: string;
  name: string;
  description: string;
  image?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
}

interface CoursesState {
  all: Course[];
}

const initialState: CoursesState = {
  all: (rawCourses as Course[]).map((c) => ({
    _id: c._id,
    name: c.name,
    description: c.description,
    image: c.image,
    number: c.number,
    startDate: c.startDate,
    endDate: c.endDate,
  })),
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (
      state,
      action: PayloadAction<
        Omit<Course, "_id">
      >
    ) => {
      const newCourse: Course = {
        _id: String(Date.now()),
        ...action.payload,
      };
      state.all.push(newCourse);
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.all = state.all.filter((c) => c._id !== action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.all = state.all.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;

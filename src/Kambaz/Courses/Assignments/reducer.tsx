import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import rawAssignments from "../../Database/assignments.json";

export interface EntryOptions {
  text: boolean;
  website: boolean;
  media: boolean;
  annotation: boolean;
  file: boolean;
}

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  descriptionHtml: string;
  points: number;
  group: string;
  displayGradeAs: string;
  submissionType: string;
  entryOptions: EntryOptions;
  assignTo: string;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  editing?: boolean;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: (rawAssignments as Assignment[]).map((a) => ({
    ...a,
    editing: false,
  })),
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      action: PayloadAction<Omit<Assignment, "_id" | "editing">>
    ) => {
      const toInsert: Assignment = {
        _id: uuidv4(),
        editing: false,
        ...action.payload,
      };
      state.assignments.push(toInsert);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload ? { ...a, editing: true } : a
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  editAssignment,
  updateAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

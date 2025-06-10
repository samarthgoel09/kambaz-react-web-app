import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as client from "./client";

export interface Assignment {
  _id: string;
  title: string;
  descriptionHtml: string;
  points: number;
  availableFrom: string;
  dueDate: string;
  availableUntil: string;
  editing?: boolean;
}

interface State {
  assignments: Assignment[];
  status: "idle" | "loading" | "failed";
}

const initialState: State = {
  assignments: [],
  status: "idle",
};
export const fetchAssignments = createAsyncThunk(
  "assignments/fetch",
  async (cid: string) => client.findAssignmentsForCourse(cid)
);

export const createAssignment = createAsyncThunk(
  "assignments/create",
  async (data: { cid: string; assn: any }) =>
    client.createAssignmentForCourse(data.cid, data.assn)
);

export const updateAssignmentById = createAsyncThunk(
  "assignments/update",
  async (assn: Assignment) => client.updateAssignment(assn)
);

export const deleteAssignmentById = createAsyncThunk(
  "assignments/delete",
  async (aid: string) => {
    await client.deleteAssignment(aid);
    return aid;
  }
);

const slice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setEditing(
      state,
      action: PayloadAction<{ id: string; editing: boolean }>
    ) {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload.id
          ? { ...a, editing: action.payload.editing }
          : a
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchAssignments.fulfilled, (s, a) => {
        s.status = "idle";
        s.assignments = a.payload;
      })
      .addCase(fetchAssignments.rejected, (s) => {
        s.status = "failed";
      })
      .addCase(createAssignment.fulfilled, (s, a) => {
        s.assignments.push(a.payload);
      })
      .addCase(updateAssignmentById.fulfilled, (s, a) => {
        s.assignments = s.assignments.map((x) =>
          x._id === a.payload._id ? { ...a.payload, editing: false } : x
        );
      })
      .addCase(deleteAssignmentById.fulfilled, (s, a) => {
        s.assignments = s.assignments.filter((x) => x._id !== a.payload);
      });
  },
});

export const { setEditing } = slice.actions;
export default slice.reducer;

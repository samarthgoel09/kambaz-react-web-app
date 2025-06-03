import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import rawModules from "../../Database/modules.json";
import { v4 as uuidv4 } from "uuid";

export interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module: string;
}

export interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: (rawModules as Module[]).map((m) => ({
    ...m,
    editing: false,
  })),
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      action: PayloadAction<Omit<Module, "_id" | "editing" | "lessons">>
    ) => {
      const toInsert: Module = {
        _id: uuidv4(),
        name: action.payload.name,
        course: action.payload.course,
        lessons: [],
        editing: false,
      };
      state.modules.push(toInsert);
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
  },
});

export const { addModule, deleteModule, editModule, updateModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons: any[];
  editing?: boolean;
}
export interface Lesson {
  _id: string;
  name: string;
  module: string;
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
    addModule: (state, action: PayloadAction<Omit<Module, "_id" | "editing" | "lessons">>) => {
      state.modules.push({
        _id: String(Date.now()),
        ...action.payload,
        lessons: [],
        editing: false,
      });
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
    },
    changeModuleName: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload.id ? { ...m, name: action.payload.name } : m
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id
          ? { ...action.payload, editing: false }
          : m
      );
    },
    
  },
});


export const {
  setModules,
  addModule,
  deleteModule,
  editModule,
  changeModuleName,    // ← export it
  updateModule,
} = modulesSlice.actions;

export default modulesSlice.reducer;

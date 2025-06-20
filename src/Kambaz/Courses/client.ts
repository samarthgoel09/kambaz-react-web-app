import axios from "axios";

// point this at your deployed backend in production via Netlify/Env,
// or fallback to localhost in dev
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";

const api = axios.create({
  baseURL: REMOTE_SERVER,
  withCredentials: true,
});

// ——— Types ———
export interface Course {
  _id: string;
  name: string;
  number: string;
  description: string;
  image: string;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

// ——— Course Endpoints ———
export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await api.get("/api/courses");
  return data;
};

export const createCourse = async (course: Partial<Course>): Promise<Course> => {
  const { data } = await api.post("/api/courses", course);
  return data;
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await api.put(`/api/courses/${course._id}`, course);
  return data;
};

export const deleteCourse = async (id: string): Promise<number> => {
  const { status } = await api.delete(`/api/courses/${id}`);
  return status;
};

// ——— Enrollment & “My Courses” ———
export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await api.get("/api/users/current/courses");
  return data;
};

export const enrollInCourse = async (courseId: string): Promise<void> => {
  await api.post(`/api/users/current/enrollments/${courseId}`);
};

export const unenrollFromCourse = async (courseId: string): Promise<void> => {
  await api.delete(`/api/users/current/enrollments/${courseId}`);
};

// ——— Modules ———
export const createModuleForCourse = async (
  courseId: string,
  module: any
): Promise<any> => {
  const { data } = await api.post(`/api/courses/${courseId}/modules`, module);
  return data;
};

export const findModulesForCourse = async (courseId: string): Promise<any[]> => {
  const { data } = await api.get(`/api/courses/${courseId}/modules`);
  return data;
};

// ——— Users in a Course ———
export const findUsersForCourse = async (
  courseId: string
): Promise<any[]> => {
  const { data } = await api.get(`/api/courses/${courseId}/users`);
  return data;
};

import axios from "axios";

// Pull in your backend URL in prod; "" → relative in dev
const BASE_URL = import.meta.env.VITE_REMOTE_SERVER || "";

// One Axios instance for everything
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ——— Endpoint paths ———
const USERS_PATH   = "/api/users";
const COURSES_PATH = "/api/courses";

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

// ——— User routes ———
export const signin = (creds: { username: string; password: string }) =>
  api.post(`${USERS_PATH}/signin`, creds).then((res) => res.data);

export const signup = (user: {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  section?: string;
  role: string;
}) => api.post(USERS_PATH, user).then((res) => res.data);

export async function profile(): Promise<any> {
  try {
    const { data } = await api.get(`${USERS_PATH}/profile`);
    return data;
  } catch (err: any) {
    if (err.response?.status === 401) return null;
    throw err;
  }
}

export const updateUser = (user: any) =>
  api.put(`${USERS_PATH}/${user._id}`, user).then((res) => res.data);

export const signout = () =>
  api.post(`${USERS_PATH}/signout`).then((res) => res.data);

// ——— Course / Enrollment routes ———
export const findMyCourses = (): Promise<Course[]> =>
  api.get<Course[]>(`${USERS_PATH}/current/courses`).then((res) => res.data);

export const createCourse = (
  course: Partial<Course>
): Promise<Course> =>
  api.post(`${USERS_PATH}/current/courses`, course).then((res) => res.data);

export const enrollInCourse = (courseId: string): Promise<void> =>
  api.post(`${USERS_PATH}/current/courses/${courseId}`).then(() => {});

export const unenrollFromCourse = (courseId: string): Promise<void> =>
  api.delete(`${USERS_PATH}/current/courses/${courseId}`).then(() => {});

export const fetchMyEnrollments = (): Promise<Enrollment[]> =>
  api.get<Enrollment[]>(`${USERS_PATH}/current/enrollments`).then((res) => res.data);

export const deleteCourse = (id: string) =>
  api.delete(`${COURSES_PATH}/${id}`).then((res) => res.data);

export const updateCourse = (course: Course) =>
  api.put(`${COURSES_PATH}/${course._id}`, course).then((res) => res.data);

// ——— Admin / Misc user queries ———
export const findAllUsers = (): Promise<any[]> =>
  api.get(USERS_PATH).then((res) => res.data);

export const findUsersByRole = (role: string) =>
  api.get(USERS_PATH, { params: { role } }).then((res) => res.data);

export const findUsersByPartialName = (name: string) =>
  api.get(USERS_PATH, { params: { name } }).then((res) => res.data);

export const findUserById = (id: string): Promise<any> =>
  api.get(`${USERS_PATH}/${id}`).then((res) => res.data);

export const deleteUser = (id: string): Promise<void> =>
  api.delete(`${USERS_PATH}/${id}`).then(() => {});

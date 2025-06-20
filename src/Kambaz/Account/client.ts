import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "";  
const axiosWithCredentials = axios.create({
  withCredentials: true,
    baseURL: REMOTE_SERVER,
});
const COURSES_API   = `${REMOTE_SERVER}/api/courses`;

export const USERS_API   = `${REMOTE_SERVER}/api/users`;

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

export const signin = (creds: { username: string; password: string }) =>
  axiosWithCredentials.post(`${USERS_API}/signin`, creds).then(res => res.data);

export const signup = (user: { username: string; password: string }) =>
  axiosWithCredentials.post(`${USERS_API}/signup`, user).then(res => res.data);

export async function profile(): Promise<any > {
  try {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/profile`);
    return data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return null;
    }
    throw err;
  }
}


export const updateUser = (user: any) =>
  axiosWithCredentials.put(`${USERS_API}/${user._id}`, user).then(res => res.data);

export const signout = () =>
  axiosWithCredentials.post(`${USERS_API}/signout`).then(res => res.data);

export const findMyCourses = (): Promise<Course[]> =>
  axiosWithCredentials.get<Course[]>(`${USERS_API}/current/courses`).then(res => res.data);

export const createCourse = (course: Partial<Course>): Promise<Course> =>
  axiosWithCredentials.post<Course>(`${USERS_API}/current/courses`, course).then(res => res.data);

export const enrollInCourse = (courseId: string): Promise<void> =>
  axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}`).then();

export const unenrollFromCourse = (courseId: string): Promise<void> =>
  axiosWithCredentials.delete(`${USERS_API}/current/courses/${courseId}`).then();

export const fetchMyEnrollments = (): Promise<Enrollment[]> =>
  axiosWithCredentials.get<Enrollment[]>(`${USERS_API}/current/enrollments`).then(res => res.data);

export const deleteCourse = (id: string) =>
  axiosWithCredentials.delete(`${COURSES_API}/${id}`).then(res => res.data);

export const updateCourse = (course: Course) =>
  axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course).then(res => res.data);

export const createUser = (user: {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  email?: string;
  section?: string;
  role: string;
}) =>
  axiosWithCredentials.post(`${USERS_API}`, user).then(res => res.data);

export const findAllUsers = (): Promise<any[]> =>
  axiosWithCredentials.get(`${USERS_API}`).then(res => res.data);

export const findUsersByRole = (role: string) =>
  axiosWithCredentials.get(`${USERS_API}`, { params: { role } }).then(res => res.data);

export const findUsersByPartialName = (name: string) =>
  axiosWithCredentials.get(`${USERS_API}`, { params: { name } }).then(res => res.data);

export const findUserById = (id: string): Promise<any> =>
  axiosWithCredentials.get(`${USERS_API}/${id}`).then(res => res.data);

export const deleteUser = (id: string): Promise<void> =>
  axiosWithCredentials.delete(`${USERS_API}/${id}`).then();

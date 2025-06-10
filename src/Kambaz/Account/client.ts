import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

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
export const findMyCourses = async (): Promise<Course[]> => {
  const { data } = await axiosWithCredentials.get<Course[]>(
    `${USERS_API}/current/courses`
  );
  return data;
};
export const createCourse = async (
  course: Partial<Course>
): Promise<Course> => {
  const { data } = await axiosWithCredentials.post<Course>(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};
export const enrollInCourse = async (courseId: string): Promise<void> => {
  await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${courseId}`
  );
};
export const unenrollFromCourse = async (
  courseId: string
): Promise<void> => {
  await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${courseId}`
  );
};
export const fetchMyEnrollments = async (): Promise<Enrollment[]> => {
  const { data } = await axiosWithCredentials.get<Enrollment[]>(
    `${USERS_API}/current/enrollments`
  );
  return data;
};
export const signin = async (credentials: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return data;
};
export const signup = async (user: { username: string; password: string }) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return data;
};
export const profile = async () => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/profile`
  );
  return data;
};
export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return data;
};
export const signout = async () => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/signout`
  );
  return data;
};

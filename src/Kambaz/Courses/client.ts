import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API   = `${REMOTE_SERVER}/api/courses`;

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


export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

export const deleteCourse = (id: string) =>
  axiosWithCredentials.delete(`${COURSES_API}/${id}`).then(r => r.status);


export const findMyCourses = () =>
  axiosWithCredentials.get<Course[]>(`${REMOTE_SERVER}/api/users/current/courses`)
    .then(r => r.data);

export const enrollInCourse = (courseId: string) =>
  axiosWithCredentials.post(`${REMOTE_SERVER}/api/users/current/enrollments/${courseId}`);

export const unenrollFromCourse = (courseId: string) =>
  axiosWithCredentials.delete(`${REMOTE_SERVER}/api/users/current/enrollments/${courseId}`);


export const createModuleForCourse = (courseId: string, module: any) =>
  axiosWithCredentials
    .post(`${COURSES_API}/${courseId}/modules`, module)
    .then(r => r.data);

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};


export async function findUsersForCourse(courseId: string) {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/users`
  );
  return data;
}

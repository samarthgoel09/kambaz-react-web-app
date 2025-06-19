import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const COURSES_API   = `${REMOTE_SERVER}/api/courses`;
const ASSNS_API     = `${REMOTE_SERVER}/api/assignments`;

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

export const findAssignmentsForCourse = (cid: string) =>
  axiosWithCredentials
    .get<Assignment[]>(`${COURSES_API}/${cid}/assignments`)
    .then(r => r.data);

export const findAssignmentById = (aid: string) =>
  axiosWithCredentials.get<Assignment>(`${ASSNS_API}/${aid}`).then(r => r.data);

export const createAssignmentForCourse = (cid: string, assn: Partial<Assignment>) =>
  axiosWithCredentials
    .post<Assignment>(`${COURSES_API}/${cid}/assignments`, assn)
    .then(r => r.data);

export const updateAssignment = (assn: Assignment) =>
  axiosWithCredentials
    .put<Assignment>(`${ASSNS_API}/${assn._id}`, assn)
    .then(r => r.data);

export const deleteAssignment = (aid: string) =>
  axiosWithCredentials.delete(`${ASSNS_API}/${aid}`);

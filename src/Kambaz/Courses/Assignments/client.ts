import axios from "axios";
const axiosWithCred = axios.create({ withCredentials: true });
const REMOTE        = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API   = `${REMOTE}/api/courses`;
const ASSNS_API     = `${REMOTE}/api/assignments`;

export const findAssignmentsForCourse = (cid: string) =>
  axiosWithCred.get(`${COURSES_API}/${cid}/assignments`).then(r => r.data);

export const findAssignmentById = (aid: string) =>
  axiosWithCred.get(`${ASSNS_API}/${aid}`).then(r => r.data);

export const createAssignmentForCourse = (cid: string, assn: any) =>
  axiosWithCred.post(`${COURSES_API}/${cid}/assignments`, assn).then(r => r.data);

export const updateAssignment = (assn: any) =>
  axiosWithCred.put(`${ASSNS_API}/${assn._id}`, assn).then(r => r.data);

export const deleteAssignment = (aid: string) =>
  axiosWithCred.delete(`${ASSNS_API}/${aid}`);

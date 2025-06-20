import axios from "axios";

// In prod set VITE_REMOTE_SERVER in Netlify (or your host); locally it falls back to localhost
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";

// One axios instance for all calls
const api = axios.create({
  baseURL: REMOTE_SERVER,
  withCredentials: true,
});

// ——— Types ———
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

// ——— Endpoint paths ———
const COURSES_PATH = "/api/courses";
const ASSNS_PATH   = "/api/assignments";

// ——— API functions ———

// List all assignments for a course
export const findAssignmentsForCourse = (cid: string): Promise<Assignment[]> =>
  api.get<Assignment[]>(`${COURSES_PATH}/${cid}/assignments`)
     .then(res => res.data);

// Fetch a single assignment by its ID
export const findAssignmentById = (aid: string): Promise<Assignment> =>
  api.get<Assignment>(`${ASSNS_PATH}/${aid}`)
     .then(res => res.data);

// Create a new assignment under a given course
export const createAssignmentForCourse = (
  cid: string,
  assn: Partial<Assignment>
): Promise<Assignment> =>
  api.post<Assignment>(`${COURSES_PATH}/${cid}/assignments`, assn)
     .then(res => res.data);

// Update an existing assignment
export const updateAssignment = (assn: Assignment): Promise<Assignment> =>
  api.put<Assignment>(`${ASSNS_PATH}/${assn._id}`, assn)
     .then(res => res.data);

// Delete an assignment by ID
export const deleteAssignment = (aid: string): Promise<void> =>
  api.delete(`${ASSNS_PATH}/${aid}`)
     .then(() => {});

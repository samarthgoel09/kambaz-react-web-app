import axios from "axios";

const axiosWithCred = axios.create({ withCredentials: true });
const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE}/api/modules`;

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCred.get(
    `${REMOTE}/api/courses/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const { data } = await axiosWithCred.post(
    `${REMOTE}/api/courses/${courseId}/modules`,
    module
  );
  return data;
};

export const updateModule = async (mod: any) => {
  console.log("Client: calling PUT /api/modules", mod);
  const { data } = await axiosWithCred.put(`${MODULES_API}/${mod._id}`, mod);
  console.log("Client: got back", data);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  await axiosWithCred.delete(`${MODULES_API}/${moduleId}`);
};

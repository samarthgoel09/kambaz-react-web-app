import axios from "axios";

const axiosWithCred = axios.create({ withCredentials: true });

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCred.get(
    `/api/courses/${courseId}/modules`
  );
  return data;   
};

export const createModuleForCourse = async (courseId: string, mod: any) => {
  const { data } = await axiosWithCred.post(
    `/api/courses/${courseId}/modules`,
    mod
  );
  return data;
};

export const updateModule = async (mod: any) => {
  const { data } = await axiosWithCred.put(
    `/api/modules/${mod._id}`,
    mod
  );
  return data;
};

export const deleteModule = async (moduleId: string) => {
  await axiosWithCred.delete(`/api/modules/${moduleId}`);
};

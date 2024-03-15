import { InVRoot } from "@/interface/stoysec.interface";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { MatrixRoot } from "@/interface/matrix.interface";
import { PartsMatrixType } from "@/interface/createpart.interface";

export const getInventory = async () => {
  const resp = await axiosInstance.get<InVRoot>(endpoints.parts.inventory);
  console.log("inv", resp.data.data);
  return resp.data.data;
};

export const getPartsMatrix = async () => {
  const resp = await axiosInstance.get<MatrixRoot>(endpoints.parts.matrix);
  console.log("parts", resp);
  return resp.data.data;
};

export const createPartsMatrix = async (body: FormData) => {
  const resp = await axiosInstance.post<PartsMatrixType>(
    endpoints.parts.matrix,
    body
  );
  return resp.data;
};

export const deleteMatrix = async (id: number) => {
  const resp = await axiosInstance.delete(endpoints.parts.delmat(id));
  return resp.data;
};

export const getSingleMatrix = async (id: number) => {
  const resp = await axiosInstance.get(
    endpoints.parts.single(id)
  );
  return resp.data.data;
};

export const editMatrix = async (body: FormData) => {
console.log('form body', body);

  // const resp = await axiosInstance.post(endpoints.parts.modify(id), body);
};

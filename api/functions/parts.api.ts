import { InVRoot } from "@/interface/stoysec.interface";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";
import { MatrixRoot } from "@/interface/matrix.interface";

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

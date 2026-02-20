import api from "../../api/client";

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const getEquipmentsByID = async (userID) => {
  return api
    .get(`${baseUrl}/equipments?ownedBy=${userID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

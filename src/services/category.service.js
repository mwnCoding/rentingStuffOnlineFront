import api from "../../api/client";

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const getCategories = async () => {
  return api
    .get(`${baseUrl}/categories`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

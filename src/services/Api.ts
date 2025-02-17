import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://db.ygoprodeck.com/api/v7/',
});

async function doGet(url: string) {
    try {
      const response = await apiClient.get(url);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return { success: false, msg: 'Erro do get'};
    }
  }

  export default doGet;
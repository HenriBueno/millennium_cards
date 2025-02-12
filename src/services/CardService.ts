import api from "./Api";

export const fetchCards = async (num: number, offset: number) => {
  try {
    const response = await api.get(`/cardinfo.php`, {
      params: {
        num: num,
        offset: offset,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar cartas:", error);
    throw error;
  }
};

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import doGet from "../../services/Api";
import { CardType } from "../../@types/types";

interface CardState {
  cards: CardType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CardState = {
  cards: [],
  status: "idle",
  error: null,
};

export const getSearchCard = createAsyncThunk(
  "card/getSearchCard",
  async (
    { search, limit, offset }: { search: string; limit: number; offset: number },
    { rejectWithValue }
  ) => {
    if (search.length < 3) return [];

    try {

      const firstResponse = await doGet(`cardinfo.php?`);

      console.log("Resposta da API:", firstResponse); 

      if (!firstResponse || !Array.isArray(firstResponse)) {
        return rejectWithValue("Nenhum resultado encontrado");
      }

      // Filtra os cards com base na pesquisa
      const filteredCards: CardType[] = firstResponse
        .filter((card: CardType) =>
          card.name.toLowerCase().includes(search.toLowerCase())
        )
        .slice(offset, offset + limit);

      return filteredCards;
    } catch (error) {
      console.error("Erro ao buscar cards:", error);
      return rejectWithValue("Erro ao buscar cards");
    }
  }
);

const CardSearchSlice = createSlice({
  name: "cardSearch",
  initialState,
  reducers: {
    addSearchCard: (state, action: PayloadAction<CardType>) => {
      state.cards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchCard.pending, (state) => {
        state.status = "loading";
        state.cards = []; // Limpa o estado ao iniciar uma nova busca
      })
      .addCase(getSearchCard.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.status = "succeeded";
      })
      .addCase(getSearchCard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.cards = []; // Limpa o estado se a busca falhar
      });
  },
});

export const { addSearchCard } = CardSearchSlice.actions;
export default CardSearchSlice.reducer;

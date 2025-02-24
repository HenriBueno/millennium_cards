import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../@types/types";
import doGet from "../../services/Api";

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

export const getCards = createAsyncThunk(
  "cardList/getCards",
  async ({ limit, offset }: { limit: number; offset: number }, thunkAPI) => {
    try {
      const response = await doGet(
        `cardinfo.php?num=${limit}&offset=${offset}`
      );
      
      

      if (!response) {
        return thunkAPI.rejectWithValue("Dados inválidos recebidos da API");
      }

      return Array.isArray(response) ? response : [];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Erro desconhecido ao buscar os cards");
    }
  }
);

const cardListSlice = createSlice({
  name: "cardList",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<CardType>) {
      state.cards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
        
        
      })
      .addCase(getCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addCard } = cardListSlice.actions;
export default cardListSlice.reducer;

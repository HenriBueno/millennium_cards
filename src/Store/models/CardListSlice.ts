import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../@types/types"; // Certifique-se de que este tipo está definido
import doGet from "../../services/Api";

interface CardState {
  cards: CardType[];
  filteredCardsList: CardType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface FiltersType {
  tipoMonstro?: string[];
  tipoFeitico?: string[];
  tipoArmadilha?: string[];
  frameType?: string[];
  nivel?: string[];
  atk?: string[];
  def?: string[];
}

const initialState: CardState = {
  cards: [],
  filteredCardsList: [],
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
      state.filteredCardsList.push(action.payload);
    },

    filterCardsByType(state, action: PayloadAction<FiltersType>) {
      const filters = action.payload;

      state.filteredCardsList = state.cards.filter((card) => {
        return Object.entries(filters).every(([key, values]) => {
          if (!values || values.length === 0) return true;

          const typedKey = key as keyof FiltersType;

          switch (typedKey) {
            case "tipoMonstro":
            case "tipoFeitico":
            case "tipoArmadilha":
              return values.some((value: string) => card.type.includes(value));
            case "frameType":
              return values.some((value: string) => card.frameType === value);
            case "nivel":
              return values.some(
                (value: string) => card.level === parseInt(value)
              );
            case "atk":
              return values.some(
                (value: string) => card.atk >= parseInt(value)
              );
            case "def":
              return values.some(
                (value: string) => card.def >= parseInt(value)
              );
            default:
              return true;
          }
        });
      });
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getCards.pending, (state) => {
        state.status = "loading";
      })

      .addCase(
        getCards.fulfilled,
        (state, action: PayloadAction<CardType[]>) => {
          state.status = "succeeded";
          state.cards = action.payload;
          state.filteredCardsList = action.payload; // Inicializa com todos os cards
        }
      )

      .addCase(getCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { addCard, filterCardsByType } = cardListSlice.actions;

export default cardListSlice.reducer;

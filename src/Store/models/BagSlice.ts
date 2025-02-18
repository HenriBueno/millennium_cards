import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../@types/types";

const initialState: CardType[] = [];

const BagSlice = createSlice({
    name: "bag",
    initialState: { card: initialState },
    reducers: {
      bagCard: (state, action: PayloadAction<CardType>) => {
        const index = state.card.findIndex((card) => card.id === action.payload.id);
  
        if (index !== -1) {
          state.card.splice(index, 1); 
        } else {
          state.card.push(action.payload); 
        }
      },
    },
  });
  

export const { bagCard } = BagSlice.actions;
export default BagSlice.reducer;

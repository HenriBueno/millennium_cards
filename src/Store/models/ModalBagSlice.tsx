import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
};

const ModalBagSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.modalType = action.payload;
      console.log(state.modalType);
      
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
    },
  },
});

export const { openModal, closeModal } = ModalBagSlice.actions;
export default ModalBagSlice.reducer;

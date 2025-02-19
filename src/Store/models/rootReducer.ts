import { combineReducers } from '@reduxjs/toolkit';
import cardListSlice from './CardListSlice';
import BagSlice from './BagSlice';
import ModalBagSlice from './ModalBagSlice';


export default combineReducers({
    card: cardListSlice,
    bag: BagSlice,
    modal: ModalBagSlice,
});
import { combineReducers } from '@reduxjs/toolkit';
import cardListSlice from './CardListSlice';
import BagSlice from './BagSlice';
import ModalBagSlice from './ModalBagSlice';
import CardSearchSlice from './CardSearchSlice';


export default combineReducers({
    card: cardListSlice,
    bag: BagSlice,
    modal: ModalBagSlice,
    searchCard: CardSearchSlice,
    
});
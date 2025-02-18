import { combineReducers } from '@reduxjs/toolkit';
import cardListSlice from './CardListSlice';
import BagSlice from './BagSlice';


export default combineReducers({
    card: cardListSlice,
    bag: BagSlice,
});
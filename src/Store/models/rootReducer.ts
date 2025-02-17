import { combineReducers } from '@reduxjs/toolkit';
import cardListSlice from './CardListSlice';


export default combineReducers({
    card: cardListSlice,
});
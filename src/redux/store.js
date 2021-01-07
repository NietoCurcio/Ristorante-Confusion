import { createStore } from 'redux';
import { Reducer } from './reducer';

const store = createStore(Reducer);
// initialState is optional, since it's defined in the reducer everything is okay
export default store;

import { combineReducers } from 'redux';
import cards from './cards';
import user from './user';
import columns from './columns';

const myApp = combineReducers({
  cards,
  user,
  columns,
});

export default myApp;

// store.js
import { createStore, combineReducers } from 'redux';
import typingReducer from './typingReducer';

const rootReducer = combineReducers({
  typing: typingReducer, // "typing" is the key under which the typingReducer will manage state
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;

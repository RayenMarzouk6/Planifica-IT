import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension'; // Correct import
import {thunk} from 'redux-thunk';
// import thunk from "/node_modules/.vite/deps/redux-thunk.js?v=4a3ab4fe";

import rootReducer from './reducers';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)) // Use the new package
);

export default store;


// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension'; // Correct import for Redux DevTools
// import {thunk} from 'redux-thunk'; // Correct import for redux-thunk
// import rootReducer from './reducers'; // Import the combined reducers

// const initialState = {};

// // Create the Redux store
// const store = createStore(
//   rootReducer, // Combined reducers
//   initialState, // Initial state
//   composeWithDevTools(applyMiddleware(thunk)) // Apply middleware (thunk) and enable DevTools
// );

// export default store;
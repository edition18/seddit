import { createStore, applyMiddleware, Store } from "redux";
import combinedReducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

function configureStore(initialState = {}): Store {
  return createStore(
    combinedReducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
    // composeWithDevTools allow us to see state on the browser (chrome) itself!!
  );
}

export const store = configureStore();

  
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, 
  combineReducers
} from 'redux';
import logger from 'redux-logger';
import boardReducer from "./store/reducers/board";
import predictionReducer from "./store/reducers/prediction";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/es/integration/react';


const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  board: boardReducer,
  pred: predictionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


let  store = createStore(persistedReducer,composeEnhancers(
    applyMiddleware(thunk, logger)));
let persistor = persistStore(store);

// export  {store, persistor}



const app = (
<Provider store = {store}> 
<BrowserRouter>
<PersistGate  loading={null}
      persistor={persistor}>
  <App />
  </PersistGate>
  </BrowserRouter>
</Provider>
);
ReactDOM.render(
  app
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
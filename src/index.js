import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import App from './App'
import * as serviceWorker from './serviceWorker';
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = { 
  user:{user:{webhook:""}},
  notifications:[],
  state:{loading:false}
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    console.log("error saving state")
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return initialState;
    }
    let state = JSON.parse(serializedState);
    console.log(state)
    state = Object.assign(initialState, state)
    console.log(state)
    return state;
  } catch (err) {
    return undefined;
  }
}; 

const store = createStore(reducer,
  loadState(),  
  composeWithDevTools(
));

store.subscribe(() => {
  saveState({
    ...store.getState()
  });
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import { render } from "react-dom";
import { App } from "./App";

import "semantic-ui-css/semantic.min.css";
import "./Styles/global.scss";
import { Provider } from "react-redux";
import promise from "redux-promise";
import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./Reducers";
import thunk from "redux-thunk";

export const store = applyMiddleware(thunk, promise)(createStore)(
  rootReducer,
  {}
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

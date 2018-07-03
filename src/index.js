import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import PostsIndex from "./components/PostsIndex";
import PostsNew from "./components/PostsNew";
import PostsShow from "./components/PostsShow";
import registerServiceWorker from "../registerServiceWorker";
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        {/* Could put an element here above the routes and it would always be available, reguardless of route */}
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id" component={PostsShow} />
        <Route path="/" component={PostsIndex} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
registerServiceWorker();

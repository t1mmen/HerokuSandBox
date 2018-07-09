import _ from "lodash";
import {
  FETCH_POSTS,
  FETCH_POST,
  DELETE_POST,
  SELECT_POST,
  DESELECT_POST
  // FETCH_AUTHORS
} from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      //  Or translated to ES6:
      return { ...state, [action.payload.data.id]: action.payload.data };
    // case FETCH_AUTHORS:
    //   return action.payload.authors;
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case SELECT_POST:
      return [...state, action.payload];
    case DESELECT_POST:
      return _.without(state, action.payload);
    default:
      return state;
  }
}

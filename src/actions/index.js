import axios from "axios";

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST = "FETCH_POST";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";
export const SELECT_POST = "SELECT_POST";
export const DESELECT_POST = "DESELECT_POST";
// export const FETCH_AUTHORS = "FETCH_AUTHORS";

const ROOT_URL = "https://youfoundnate.com/wolfcircus/wp-json/wp/v2";
// const AUTHOR_URL =
//   "https://youfoundnate.com/wolfcircus/wp-json/wp/v2/users/?_embed";

// export function fetchAuthors() {
//   const request = axios.get(`${AUTHOR_URL}`);
//   console.log(request);
//   return dispatch => {
//     request.then(({ authors }) => {
//       dispatch({ type: "FETCH_AUTHORS", payload: authors });
//     });
//   };
// }

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts/`);
  console.log(request);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/posts`, values)
    // this callback handles the race condition that is created when the post is submitted and the user is navigated back to the index page.
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  // const request = axios.get(`${ROOT_URL}/posts/${id}${EMBED_KEY}`);
  const request = axios.get(`${ROOT_URL}/posts/${id}`);
  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios
    .delete(`${ROOT_URL}/posts/${id}`)
    .then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  };
}

export function selectPost(id) {
  return {
    type: SELECT_POST,
    payload: id
  };
}

export function deselectPost(id) {
  return {
    type: DESELECT_POST,
    payload: id
  };
}

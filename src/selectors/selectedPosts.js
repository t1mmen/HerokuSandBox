import { createSelector } from "reselect";
import _ from "lodash";

const postsSelector = state => state.posts;
const selectedPostsSelector = state => state.selectedPostIds;

const getPosts = (posts, selectedPostIds) => {
  const selectedPosts = _.filter(posts, post =>
    _.contains(selectedPostIds, post.id)
  );
  return selectedPosts;
};

export default createSelector(postsSelector, selectedPostsSelector, getPosts);

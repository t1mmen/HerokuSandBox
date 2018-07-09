import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, selectPost, deselectPost } from "../actions";
import _ from "lodash";
import SelectedPostsList from "./SelectedPostsList";

class PostsIndex extends Component {
  // It dosen't matter if the data fetching is done before or after the component is called, React is asyncronously getting the data asap.
  // This is a lifecycle method built into React and will be called automatically if it is defined as below
  componentDidMount() {
    this.props.fetchPosts();
    // this.props.fetchAuthors();
  }

  handlePostSelect({ id }, event) {
    const { selectPost, deselectPost } = this.props;

    event.target.checked ? selectPost(id) : deselectPost(id);
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      // const eachAuthor = this.props.authors.find(
      //   d => d.id === post.data[0].author
      // );
      console.log(_.contains(this.props.selectedPostIds, post.id));
      return (
        <li key={post.id} className="list-group-item">
          <input
            checked={_.contains(this.props.selectedPostIds, post.id)}
            type="checkbox"
            onChange={this.handlePostSelect.bind(this, post)}
          />
          <Link className="title" to={`/posts/${post.id}`}>
            {post.title.rendered}
          </Link>
          <div>
            <a className="link" href={post.link} target="_blank">
              ...on WordPress
            </a>
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <SelectedPostsList />
        <div>
          <h1 className="center">The PHP-Free Blog platform for Node Lovers</h1>
        </div>
        <div className="text-xs-right">
          <Link className="btn btn-primary margin-top" to="/posts/new">
            Add a post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts, selectedPostIds: state.selectedPostIds };
}
// fetchPosts here is equal to { fetchPosts: fetchPosts }, and used in this manner, without mapDispatchToProps still gives this component access to the redux store, with a slightly different syntax.
// export default connect(
//   mapStateToProps,
//   { fetchPosts, selectPost, deselectPost }
// )(PostsIndex);

export default connect(
  mapStateToProps,
  {
    fetchPosts,
    selectPost,
    deselectPost
  }
)(PostsIndex);

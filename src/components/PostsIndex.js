import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions";
import _ from "lodash";

class PostsIndex extends Component {
  // It dosen't matter if the data fetching is done before or after the component is called, React is asyncronously getting the data asap.
  // This is a lifecycle method built into React and will be called automatically if it is defined as below
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
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
  return { posts: state.posts };
}

// fetchPosts here is equal to { fetchPosts: fetchPosts }, and used in this manner, without mapDispatchToProps still gives this component access to the redux store, with a slightly different syntax.
export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostsIndex);

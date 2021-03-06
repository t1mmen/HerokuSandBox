import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import { deletePost } from "../actions";
import { Link } from "react-router-dom";

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div> Loading...</div>;
    }

    return (
      <div>
        <div>
          <h1 className="center">The PHP-Free Blog platform for Node Lovers</h1>
        </div>
        <Link to="/">Back to Posts</Link>
        <button
          onClick={this.onDeleteClick.bind(this)}
          className="btn btn-danger pull-xs-right margin-top"
        >
          Delete Post
        </button>
        <h3>{post.title.rendered}</h3>
        <h6>Categories: {console.log(post)}</h6>
        <p>{post.content.rendered}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchPost, deletePost }
)(PostsShow);

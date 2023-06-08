import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../helpers/AuthContext";
import "./css/showPost.css";

const Showposts = ({ refreshPosts, onPostsRefreshed }) => {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedPostBody, setUpdatedPostBody] = useState("");
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER + "/api/posts"
        );
        const data = await response.json();
        setPosts(data);
        if (typeof onPostsRefreshed === "function") {
          onPostsRefreshed();
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (refreshPosts) {
      fetchPosts();
    }
  }, [refreshPosts, onPostsRefreshed]);

  const deletePost = async (postId) => {
    try {
      const id = parseInt(postId, 10);
      const response = await fetch(
        import.meta.env.VITE_SERVER + `/api/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.post_id !== postId)
        );
      } else {
        console.error("Failed to delete post:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startEditing = (postId, postBody) => {
    setEditingPostId(postId);
    setUpdatedPostBody(postBody);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setUpdatedPostBody("");
  };

  const updatePost = async (postId) => {
    try {
      const id = parseInt(postId, 10);
      const trimmedPostBody = updatedPostBody.trim();

      if (trimmedPostBody === "") {
        alert("Please enter a valid post body");
        return;
      }

      const response = await fetch(
        import.meta.env.VITE_SERVER + `/api/posts/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post_body: updatedPostBody }),
        }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, post_body: updatedPostBody }
              : post
          )
        );

        if (typeof onPostsRefreshed === "function") {
          onPostsRefreshed();
        }

        setEditingPostId(null);
        setUpdatedPostBody("");

        //after you update the post here, u just fetch the whole data again and re-render by updating the states
        const updatedResponse = await fetch(
          import.meta.env.VITE_SERVER + "/api/posts"
        );
        const updatedData = await updatedResponse.json();
        setPosts(updatedData);
      } else {
        console.error("Failed to update post:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const reversedPosts = [...posts].reverse();

  // const fetchUsername = async (postUserID) => {
  //   try {
  //     const response = await fetch(
  //       import.meta.env.VITE_SERVER + `/api/users/${postUserID}`
  //     );
  //     const data = await response.json();
  //     return data.user_name;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const getUsername = async (postUserID) => {
  //   const username = await fetchUsername(postUserID);
  //   console.log("username", username);
  //   if (username) {
  //     return username;
  //   }
  //   return "Unknown User";
  // };

  return (
    <div>
      <h2>Posts</h2>
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post" key={post.post_id}>
            {editingPostId === post.post_id ? (
              <div>
                <textarea
                  value={updatedPostBody}
                  onChange={(e) => setUpdatedPostBody(e.target.value)}
                  className="post-textarea"
                ></textarea>
                <div className="post-buttons">
                  <button
                    onClick={() => updatePost(post.post_id)}
                    className="
                    btn
                    btn-danger
                    save-post-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="
                    btn
                    btn-danger
                    cancel-post-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="post-content">
                {post.user_id === userId ? (
                  <p
                    className="editable-post"
                    onClick={() => startEditing(post.post_id, post.post_body)}
                  >
                    {post.post_body}
                  </p>
                ) : (
                  <p>{post.post_body}</p>
                )}
                <div className="post-details">
                  <p>Posted by:{post.user_id}</p>
                  <p> Posted on: {post.created_on}</p>
                </div>
                {post.user_id === userId && (
                  <div className="post-buttons">
                    <button
                      onClick={() => deletePost(post.post_id)}
                      className="btn btn-danger delete-post-button"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showposts;

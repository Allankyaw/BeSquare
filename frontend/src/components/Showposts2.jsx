import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../helpers/AuthContext";

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
      } else {
        console.error("Failed to update post:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reversedPosts = [...posts].reverse();

  return (
    <div>
      <h2>Posts</h2>
      {reversedPosts.map((post) => (
        <div key={post.post_id}>
          {editingPostId === post.post_id ? (
            <div>
              <textarea
                value={updatedPostBody}
                onChange={(e) => setUpdatedPostBody(e.target.value)}
                style={{ height: "100px" }}
              ></textarea>
              <div>
                <button onClick={() => updatePost(post.post_id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <p onClick={() => startEditing(post.post_id, post.post_body)}>
                {post.post_body}
              </p>
              <p>Posted by: {post.user_id}</p> {/* Display user name */}
              {post.user_id === userId && (
                <button onClick={() => deletePost(post.post_id)}>Delete</button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Showposts;

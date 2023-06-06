import React, { useState, useEffect } from "react";

const Showposts = ({ refreshPosts, onPostsRefreshed }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the database or API
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER + "/api/posts"
        );
        const data = await response.json();
        setPosts(data);

        // Call the callback function to notify the parent component
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
      await fetch(import.meta.env.VITE_SERVER + `/api/posts/${id}`, {
        method: "DELETE",
      });

      // Update the posts state by filtering out the deleted post
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.post_id !== postId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async (postId, updatedPostData) => {
    try {
      const id = parseInt(postId, 10);
      await fetch(import.meta.env.VITE_SERVER + `/api/posts/${id}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPostData),
      });

      // Refresh the posts by fetching them again from the database or API
      if (typeof onPostsRefreshed === "function") {
        onPostsRefreshed();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reversedPosts = [...posts].reverse(); // Create a copy of the posts array and reverse it

  return (
    <div>
      <h2>Posts</h2>
      {reversedPosts.map((post) => (
        <div key={post.post_id}>
          <p>{post.post_body}</p>
          <button onClick={() => deletePost(post.post_id)}>Delete</button>
          <button
            onClick={() =>
              updatePost(post.post_id, {
                body: "Updated Body",
              })
            }
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default Showposts;

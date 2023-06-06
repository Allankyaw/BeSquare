import React, { useState } from "react";

const CreatePost = ({ onPostCreated }) => {
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_body: body }),
      });

      // Handle successful post creation
      const data = await response.json();
      console.log(data);
      // Reset the form
      setBody("");
      onPostCreated();
      // Call the callback function to notify the parent component
    } catch (error) {
      // Handle post creation error
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

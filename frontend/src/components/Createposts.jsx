import React, { useContext, useState } from "react";
import AuthContext from "../helpers/AuthContext";
import "./css/createPost.css";

const CreatePost = ({ onPostCreated, userId }) => {
  const [body, setBody] = useState("");
  const userContext = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_body: body, user_id: userContext.userId }),
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
    <div className="create-post-container">
      <h2>Share something today!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-control textarea-fixed"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary create-post-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

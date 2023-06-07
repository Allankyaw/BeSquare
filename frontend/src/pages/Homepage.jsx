import React, { useState } from "react";
import Showposts from "../components/Showposts";
import CreatePost from "../components/Createposts";
import Showposts2 from "../components/Showposts2";

const HomePage = () => {
  const [refreshPosts, setRefreshPosts] = useState(true);

  const handlePostCreated = () => {
    // Set the flag to true to trigger a re-render of the Showposts component
    setRefreshPosts(true);
  };

  const handlePostsRefreshed = () => {
    // Reset the flag after the Showposts component has been re-rendered
    setRefreshPosts(false);
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />
      <Showposts2
        refreshPosts={refreshPosts}
        onPostsRefreshed={handlePostsRefreshed}
      />
    </div>
  );
};

export default HomePage;

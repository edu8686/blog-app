import Post from "../features/posts/Post";
import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { Link } from "react-router-dom";
import { deletePost } from "../api";

function Home() {
  const [posts, setPosts] = useState([]);

    async function fetchPosts() {
    const data = await getPosts();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);




  return (
    <div className="max-w-3xl mx-auto mt-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} deletePost={deletePost} fetchPosts={fetchPosts} />
      ))}

      <div className="flex justify-center mt-4">
        <Link
          to="/new-post"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          New Post
        </Link>
      </div>
    </div>
  );
}

export default Home;

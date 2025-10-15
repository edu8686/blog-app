import Post from "../components/Post";
import { getPosts } from "../api";
import { useEffect, useState } from "react";
import { createComment } from "../api";

function Home() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const data = await getPosts();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // 👇 Pasamos createComment que refresca
  async function handleCreateComment(postId, text, author) {
    await createComment(postId, text, author);
    fetchPosts(); // vuelve a pedir todos los posts con comentarios actualizados
  }

  console.log(posts);
  console.log("🎨 Renderizando lista de posts:", posts.length);


  return (
    <div className="max-w-3xl mx-auto mt-6">
      {posts.map((post) => (
        post.isPublished && (
          <Post key={post.id} post={post} createComment={handleCreateComment} />
        )
      ))}
    </div>
  );
}

export default Home;

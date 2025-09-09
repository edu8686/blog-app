const API_URL = "https://blog-app-69pn.onrender.com";



export async function getPostById(id) {
  try {
    const post = await fetch(`${API_URL}/posts/${id}`, {
      method: "GET",
    });
    const data = post.json();
    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
}

export async function getPosts() {
  try {
    const res = await fetch(`${API_URL}/posts/all`, {
      method: "GET",
    });
    const posts = await res.json();

    if (!res.ok) {
      throw new Error("Error fetching posts");
    }

    // Transformamos cada post
    const postsFormateados = posts.map((post) => ({
      ...post,
      fechaLegible: new Date(post.createdAt).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));

    return postsFormateados;
  } catch (err) {
    console.error("Error al traer posts:", err);
    return [];
  }
}


export async function createComment(postId, text, author) {
  try {
    const newComment = await fetch(
      `${API_URL}/post/${postId}/comments/new_comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author }),
      }
    );

    if (!newComment.ok) {
      throw new Error(`Error ${newComment.status}`);
    }
    const data = await newComment.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

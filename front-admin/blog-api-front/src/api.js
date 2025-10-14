const API_URL = "https://blog-app-69pn.onrender.com/";

export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  console.log(data);

  return data;
}

// export async function logout() {
//   localStorage.removeItem("token");
//   console.log(localStorage.getItem("token"));
// }

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

export async function deletePost(id) {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const postDeleted = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await postDeleted.json();

    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
}

export async function updatePost(id, updatedData) {
  const token = localStorage.getItem("token");
  console.log(token);

  try {
    const updatePost = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData)
    });
    console.log(updatedData)
    const data = await updatePost.json();
    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
}

export async function createPost(post, publish) {
  const title = post.title;
  const text = post.text;
  const token = localStorage.getItem("token");

  try {
    const newPost = await fetch(`${API_URL}/posts/new-post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text, publish }),
    });

    if (!newPost.ok) {
      const text = await newPost.text(); // ver el HTML o mensaje de error
      throw new Error(text);
    }

    const data = newPost.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createComment(postId, text, author) {
  const token = localStorage.getItem("token");
  try {
    const newComment = await fetch(
      `${API_URL}/post/${postId}/comments/new_comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
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



export async function deleteComment(commentId, postId) {

  const token = localStorage.getItem("token")

  try {
    const commDeleted = await fetch(`${API_URL}/posts/${postId}/comment/${commentId}`, {
      method : "DELETE",
      headers : { "authorization" : `Bearer ${token}`}
    })

    return commDeleted

  } catch(err) {
    console.log(err)
  }

}

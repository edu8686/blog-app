import CommentItem from "./CommentItem";

function Post({ post, createComment }) {
  console.log("🧩 Renderizando Post:", post.title);
  console.log("Post component: ", post);
  console.log("Coments: ", post.comments);
  const comments = post.comments;

  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-6">
      {/* Título */}
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      {/* Contenido */}
      <p className="text-gray-700 mb-4">{post.text}</p>
      {/* Fecha */}
      <p className="text-sm text-gray-500 mb-4">{post.fechaLegible}</p>
      {/* Comentarios */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comentarios</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No hay comentarios todavía.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-100 rounded-md p-3 mb-3 shadow-sm"
            >
              <p className="text-gray-800">{comment.text}</p>
              <p className="text-sm text-gray-500 mt-1">— {comment.author}</p>
            </div>
          ))
        )}
      </div>

      {console.log(post.id)}
      <CommentItem postId={post.id} createComment={createComment}></CommentItem>
    </div>
  );
}

export default Post;

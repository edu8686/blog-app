import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { deleteComment, updatePost } from "../../api";

function Post({ post, deletePost, fetchPosts }) {
  console.log("Post component: ", post);
  console.log("Coments: ", post.comments);
  const comments = post.comments;

return (
  <div className="bg-white shadow-md rounded-md p-6 mb-6">
    {/* Título y contenido */}
    <h2 className="text-xl font-bold mb-2">{post.title}</h2>
    <p className="text-gray-700 mb-4">{post.text}</p>
    <p className="text-sm text-gray-500 mb-4">{post.fechaLegible}</p>
    {post.isPublished ? (
      <p className="text-sm text-green-500 mb-4">Published</p>
    ) : (
      <p className="text-sm text-gray-500 mb-4">Not published</p>
    )}

    {/* Comentarios */}
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Comentarios</h3>
      {comments.length === 0 ? (
        <p className="text-gray-500">No hay comentarios todavía.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id}>
            <div className="bg-gray-100 rounded-md p-3 mb-3 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-gray-800">{comment.text}</p>
                <p className="text-sm text-gray-500 mt-1">— {comment.author}</p>
              </div>
              <Button
                onClick={() => {
                  deleteComment(comment.id, post.id);
                  fetchPosts();
                }}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 flex items-center justify-center"
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Botones de acción */}
    <div className="flex justify-end space-x-2 mt-4">
      {/* Publicar / Despublicar */}
      <Button
        onClick={async () => {
          const updated = { ...post, isPublished: !post.isPublished };
          await updatePost(post.id, updated);
          fetchPosts();
        }}
        className={`px-3 py-1 text-sm rounded font-bold flex items-center justify-center ${
          post.isPublished ? "bg-gray-300 hover:bg-gray-400" : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {post.isPublished ? "Unpublish" : "Publish"}
      </Button>

      {/* Editar */}
      <Link
        to={`/edit-post/${post.id}`}
        state={{ post }}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded flex items-center justify-center text-sm"
      >
        Edit
      </Link>

      {/* Eliminar */}
      <Button
        variant="danger"
        onClick={() => deletePost(post.id)}
        className="px-3 py-1 text-sm rounded font-bold flex items-center justify-center"
      >
        Delete post
      </Button>
    </div>
  </div>
);

}

export default Post;

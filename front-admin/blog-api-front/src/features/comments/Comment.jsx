import { useState } from "react";
import Button from "../../components/Button";

function Comment({ postId, createComment }) {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return; 
    createComment(postId, comment, author);           
    setComment(""); 
    setAuthor("")
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="comment" className="block font-medium">
        Comentario
      </label>
      <input
        id="comment"
        name="comment"
        type="text"
        value={comment}
        onChange={handleCommentChange}
        className="w-full border p-2 rounded"
        placeholder="Escribe tu comentario..."
      />
      <label htmlFor="comment" className="block font-medium">
        Nombre
      </label>
      <input
        id="nombre"
        name="nombre"
        type="text"
        value={author}
        onChange={handleAuthorChange}
        className="w-full border p-2 rounded"
        placeholder="Escribe tu comentario..."
      />
      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Enviar
      </Button>
    </form>
  );
}

export default Comment;

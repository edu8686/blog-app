// src/components/Form.jsx
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Form = ({
  updatePost,
  initialValues = { title: "", text: "" },
  edit,
}) => {
  const [formData, setFormData] = useState(initialValues);

  const navigate = useNavigate();

  const location = useLocation();
  const { post } = location.state || {}; // 👈 recuperás el objeto

  useEffect(() => {
    if (edit && post) {
      setFormData(post);
    }
  }, [edit, post]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, publish) => {
    e.preventDefault();

    if (edit) {
      const updated = { ...formData, isPublished: publish };
      await updatePost(post.id, updated);
    } else {
      await createPost(formData, publish);
    }

    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1></h1>
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Content</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows="4"
          required
        />
      </div>
      <Button
        type="button"
        onClick={(e) => handleSubmit(e, false)}
        className="mr-2"
      >
        Save
      </Button>

      <Button type="button" onClick={(e) => handleSubmit(e, true)}>
        Publish
      </Button>
    </form>
  );
};

export default Form;

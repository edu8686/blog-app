const prisma = require("../prisma");

async function getPostById(req, res, next) {
  const id = req.params.id;
  let post;
  try {
    post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: { comments: true },
    });
  } catch (err) {
    next(err);
    return;
  }

  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).send("Post not found");
  }
}

async function getUserPosts(req, res, next) {

  try {
    posts = await prisma.post.findMany({
      include : { comments : true}
    });

    if (posts.length > 0) {
      res.status(200).json(posts);
      return;
    } else {
      res.status(404).send("Posts not found");
      return;
    }
  } catch (err) {
    next(err);
    return;
  }
}

async function createPost(req, res, next) {
  const newPost = req.body;
  const userId = req.user.id;

  if (!newPost.title || newPost.title.length < 3) {
    return res.status(400).send("Title too short");
  }
  if (!newPost.text || newPost.text.length < 10) {
    return res.status(400).send("Text too short");
  }

  try {
    const createdPost = await prisma.post.create({
      data: {
        title: newPost.title,
        text: newPost.text,
        author: {
          connect: { id: userId },
        },
        isPublished: newPost.isPublished ?? true
      },
    });

    res.status(201).json(createdPost);
  } catch (err) {
    next(err);
    return;
  }
}

async function updatePost(req, res, next) {
  const id = Number(req.params.id);
  const { title, text, isPublished } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: { title, text, isPublished },
    });
    res.json(updatedPost);
  } catch (err) {
    next(err);
    return;
  }
}

async function deletePost(req, res, next) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("Not valid id");
    return;
  }

  try {
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json("Post eliminado correctamente");
  } catch (err) {
    console.error("Error en deletePost:", err); // 👈 ver causa real
    if (err.code === "P2025") {
      // Prisma error: "Record to delete does not exist"
      res.status(404).json("Post not found");
    } else {
      next(err);
    }
    return;
  }
}

module.exports = {
  getPostById,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
};

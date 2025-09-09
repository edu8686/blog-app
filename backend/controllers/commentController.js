const prisma = require("../prisma");

async function getCommentById(req, res, next) {
  const id = req.params.id;
  let comment;
  try {
    comment = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
    });
  } catch (err) {
    next(err);
    return;
  }

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).send("Comment not found");
  }
}

async function getAllComments(req, res, next) {
  const id = Number(req.params.id);
  let comments;

  if (isNaN(id)) {
    res.status(400).send("Invalid user ID");
    return;
  }

  try {
    comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
      include: { author: true, post: true },
    });

    if (comments.length > 0) {
      res.status(200).json(comments);
      return;
    } else {
      res.status(404).send("Comments not found");
      return;
    }
  } catch (err) {
    next(err);
    return;
  }
}

async function createComment(req, res, next) {
  const postId = req.params.id;
  const { text, author } = req.body;

  if (!text) {
    res.status(400).send("Text required");
    return;
  }

  try {
    const createdComment = await prisma.comment.create({
      data: {
        text,
        author,
        post: {
          connect: { id: Number(postId) },
        },
      },
    });
    res.status(201).json(createdComment);
  } catch (err) {
    next(err);
    return;
  }
}

async function updateComment(req, res, next) {
  const id = Number(req.params.id);
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).send("Comment not found");
    }

    if (comment.userId !== userId) {
      return res.status(403).send("You can only edit your own comments");
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id: id,
      },
      data: { text },
    });
    res.json(updatedComment);
  } catch (err) {
    next(err);
    return;
  }
}

async function deleteComment(req, res, next) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send("Not valid id");
    return;
  }

  try {
    await prisma.comment.delete({
      where: { id },
    });
    res.status(200).send("Comment deleted correctly");
  } catch (err) {
    if (err.code === "P2025") {
      // Prisma error: "Record to delete does not exist"
      res.status(404).send("Comment not found");
    } else {
      next(err);
    }
    return;
  }
}

module.exports = {
  getCommentById,
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};

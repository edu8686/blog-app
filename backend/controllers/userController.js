const prisma = require("../prisma");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const authentication = require("../authentication/authentication");
const { createJWT } = require("../authentication/authentication");

async function getUser(req, res) {
  console.log("User getUser: ", req.user)
  res.json(req.user);
}

async function signupUser(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password required");
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    next(err);
  }
}


async function loginUser(req, res) {
  // Passport ya autenticó, por eso req.user está disponible
  const user = req.user;

  const token = createJWT(user.id); // Usa tu función createJWT

  res.json({
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      username: user.username,
    },
  });
}




async function updateUser(req, res, next) {
  const userId = Number(req.user.id);
  const data = {}
  if(req.body.username) {
    data.username = req.body.username;
  }

  if(req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    data.password = hashedPassword
  }

  try {
    const userUpdated = await prisma.user.update({
        where : { id : userId },
        data 
    })
    res.status(200).json({ message : "User updated", userUpdated})
  } catch (err) {
    next(err)
  }
}

async function deleteUser(req, res, next) {
  const userId = Number(req.user.id);
  if (isNaN(userId)) {
    return res.status(400).send("Invalid user to delete");
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  signupUser
};

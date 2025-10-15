const express = require("express");
const app = express();
const routerFile = require("./routes")
const cors = require("cors")
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors({
  origin: [
    "https://blog-front-write.onrender.com",
    "https://blog-app-1-2fcm.onrender.com",
    "http://localhost:5173",
    "http://localhost:5170"

  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true // si usás auth con cookies o cabeceras
}));

// Para OPTIONS global
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use("/", routerFile)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


module.exports = app;
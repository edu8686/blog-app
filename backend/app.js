const express = require("express");
const app = express();
const routerFile = require("./routes")
const cors = require("cors")
const PORT = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5170", "http://localhost:5173"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use("/", routerFile)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


module.exports = app;
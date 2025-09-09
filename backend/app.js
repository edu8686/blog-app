const express = require("express");
const app = express();
const routerFile = require("./routes")
const cors = require("cors")

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

app.listen(3000, () => {
    console.log("Listening on port 3000")
})


module.exports = app;
const express = require("express");
const app = express();
const routerFile = require("./routes")
const cors = require("cors")
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: [
  "https://blog-front-write.onrender.com",
  "https://blog-app-1-2fcm.onrender.com"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
}));


app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use("/", routerFile)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


module.exports = app;
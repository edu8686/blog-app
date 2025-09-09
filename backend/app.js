const express = require("express");
const app = express();
const routerFile = require("./routes")
const cors = require("cors")
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "https://blog-front-write.onrender.com",
  "https://blog-app-1-2fcm.onrender.com"
];

app.use(cors({
  origin: function(origin, callback){
    // Permitir requests sin origin (por ejemplo desde Postman o backend)
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)){
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  }
}));


app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use("/", routerFile)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


module.exports = app;
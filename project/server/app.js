const express = require("express");
const api = require("./apis/api.js");
const db_handler = require("./database_handler.js");
const {initializeDatabase} = require("./script.js");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;

async function startup() {
  
  await db_handler.openConnection();

  process.on("SIGINT", async function() {
    await db_handler.closeConnection();
  });

  app.use(cookieParser());

  //https://stackoverflow.com/questions/36125216/express-handling-urierror-failed-to-decode-param
  app.use(function(err, req, res, next) {
    if (err instanceof URIError) {
        err.message = 'Failed to decode param: ' + req.url;
        err.status = err.statusCode = 400;
    } 
  });
  
  app.use(express.static(path.join(__dirname, "..", "public/dist")));

  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
    } else {
      res.sendFile(path.join(__dirname, "..", "public/dist", "index.html"));
    }
  });

  app.use("/api", api);

  if(Number(process.env.DEFAULT_DATABASE) !== 0) {
    initializeDatabase();
  }

  app.listen(port, () => {
    console.log(`In ascolto sulla porta ${port}!`);
  });
  return;
}

async function main() {
  await startup();
}

main();
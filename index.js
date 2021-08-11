// Importing the Express
const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
// Importing all the routes
const postsRoute = require("./routes/posts.routes");
// const usersRoute = require("./routes/users");

const mongo = require("./shared/mongo");

async function loadApp() {
  try {
    // Mongo Connection
    await mongo.connect();

    app.use(cors());
    // Middlewares
    // Purpose => Parse Request Body
    app.use(express.json());
    // Purpose => Logging
    app.use((req, res, next) => {
      console.log(`${req.url} ${req.method} at ${new Date()}`);
      next();
    });
    // Purpose => Deny access to DELETE API
    // app.use((req, res, next) => {
    //   if (req.method !== "DELETE") {
    //     next();
    //   } else {
    //     res.send({ message: "You are not allowed to access DELETE method" });
    //   }
    // });

    // Routes
    app.use("/posts", postsRoute);
    // app.use("/users", usersRoute);

    // Starting Server
    app.listen(process.env.PORT, () => console.log(`Server listening at port ${process.env.PORT}...`));
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

loadApp();

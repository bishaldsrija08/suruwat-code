import express = require("express");
import courseCategoryRoutes = require("./routes/b2c/courseCategoryRoutes");

const app = express();

app.use(express.json());


// Routes starts

// Course category routes
app.use("/api/", courseCategoryRoutes)



// Routes ends

export = app;
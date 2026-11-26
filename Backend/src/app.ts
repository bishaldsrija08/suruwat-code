import express = require("express");
import courseCategoryRoutes = require("./routes/b2c/courseCategoryRoutes");
import courseRoutes = require("./routes/b2c/courseRoutes");

const app = express();

app.use(express.json());


// Routes starts

// Course category routes
app.use("/api/", courseCategoryRoutes)

// Course routes
app.use("/api/", courseRoutes)



// Routes ends

export = app;
import express = require("express");
import courseCategoryRoutes = require("./routes/b2c/courseCategoryRoutes");
import courseRoutes = require("./routes/b2c/courseRoutes");
import instructorRoutes = require("./routes/b2c/instructorRoutes");

const app = express();

app.use(express.json());


// Routes starts

// Course category routes
app.use("/api/", courseCategoryRoutes)

// Course routes
app.use("/api/", courseRoutes)

// Instructor routes
app.use("/api/", instructorRoutes)



// Routes ends

export = app;
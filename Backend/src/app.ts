import express = require("express");
import courseCategoryRoutes = require("./routes/b2c/courseCategoryRoutes");
import courseRoutes = require("./routes/b2c/courseRoutes");
import instructorRoutes = require("./routes/b2c/instructorRoutes");
import courseInquiryRoutes = require("./routes/b2c/courseInquiryRoutes");

const app = express();

app.use(express.json());


// Routes starts

// Course category routes
app.use("/api/", courseCategoryRoutes)

// Course routes
app.use("/api/", courseRoutes)

// Instructor routes
app.use("/api/", instructorRoutes)

// Course inquiry routes
app.use("/api/", courseInquiryRoutes);


// Routes ends

export = app;
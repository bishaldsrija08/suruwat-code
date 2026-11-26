// Routes here
import express from 'express';
import { createCourse, getAllPublishedCourses, getCourseBySlug } from '../../controllers/b2c/courseController';

const router = express.Router();

router.route("/courses").post(createCourse).get(getAllPublishedCourses);
router.route("/courses/:slug").get(getCourseBySlug);


export = router;
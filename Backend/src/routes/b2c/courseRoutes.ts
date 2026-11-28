// Routes here
import express from 'express';
import { createCourse, deleteCoure, getAllPublishedCourses, getCourseBySlug, markCourseAsFeatured, publishUnpublishCourse, searchCourses, updateCourse } from '../../controllers/b2c/courseController';

const router = express.Router();

router.route("/courses").post(createCourse).get(getAllPublishedCourses);
router.route("/courses/search/").get(searchCourses);
router.route("/courses/:slug").get(getCourseBySlug);
router.route("/courses/:courseId").patch(updateCourse).delete(deleteCoure);
router.route("/courses/:courseId/publish-unpublish").patch(publishUnpublishCourse);
router.route("/courses/:courseId/feature-unfeature").patch(markCourseAsFeatured);


export = router;
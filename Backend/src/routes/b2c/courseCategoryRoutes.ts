// Routes here
import express from 'express';
import { createCategory, getAllCategories } from '../../controllers/b2c/courseCategoryController';
const router = express.Router();


router.route("/course-categories").post(createCategory).get(getAllCategories);


export = router;
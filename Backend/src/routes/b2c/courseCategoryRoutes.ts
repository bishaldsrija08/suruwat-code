// Routes here
import express from 'express';
import { createCategory, deleteCategory, getActiveCategories, getAllCategories, getCategoryDetails, toggleCategoryStatus, updateCategory } from '../../controllers/b2c/courseCategoryController';
const router = express.Router();


router.route("/course-categories").post(createCategory).get(getAllCategories);
router.route("/course-categories/active").get(getActiveCategories);
router.route("/course-categories/:categoryId").get(getCategoryDetails).patch(updateCategory).delete(deleteCategory);
router.route("/course-categories/:categoryId/status").patch(toggleCategoryStatus);


export = router;
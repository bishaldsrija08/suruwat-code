// Routes here
import express from 'express';
import { createInstructor, deleteInstructor, filterInstructors, getActiveInstructors, getAllInstructors, getInstructorById, getInstructorProfileBySlug, searchInstructors, toggleInstructorStatus, updateInstructor } from '../../controllers/b2c/instructorsControllor';

const router = express.Router();

router.route("/instructors").post(createInstructor).get(getAllInstructors);
router.route("/instructors/search").get(searchInstructors);
router.route("/instructors/filter").get(filterInstructors);
router.route("/instructors/active").get(getActiveInstructors);
router.route("/instructors/profile/:instructorSlug").get(getInstructorProfileBySlug);
router.route("/instructors/:instructorId").get(getInstructorById).patch(updateInstructor).delete(deleteInstructor);
router.route("/instructors/:instructorId/toggle-status").patch(toggleInstructorStatus);


export = router;
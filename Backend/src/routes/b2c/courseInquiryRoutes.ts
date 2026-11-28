// Routes here
import express from 'express';
import { createCourseInquiry, deleteCourseInquiryById, getAllCourseInquiries, getCourseInquiryById, updateCourseInquiryById, updateInquiryStatusById } from '../../controllers/b2c/courseInquiryController';

const router = express.Router();
router.route("/course-inquiries").post(createCourseInquiry).get(getAllCourseInquiries);
router.route("/course-inquiries/:inquiryId").get(getCourseInquiryById).patch(updateCourseInquiryById).delete(deleteCourseInquiryById);
router.route("/course-inquiries/:inquiryId/status").patch(updateInquiryStatusById);


export = router;
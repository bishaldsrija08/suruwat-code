import { Request, Response } from "express";
import { courseInquirySchema } from "../../utils/zod"
import CourseInquiry, { PreferredContact } from "../../models/crm/courseInquiry.model";
import mongoose from "mongoose";
import Course from "../../models/courses/course.model";

// Create course inquiry controller
const createCourseInquiry = async (req: Request, res: Response) => {
    const { data, error } = courseInquirySchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            error: error.issues
        })
    }

    const { studentName, parentName, parentEmail, parentPhone, courseId, studentAge, inquiryMessage, preferredContactMethod } = data;
    if (!studentName || !parentName || !parentEmail || !parentPhone || !courseId || studentAge === undefined) {
        return res.status(400).json({
            message: "Missing required fields"
        })
    }

    // check if course is available
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }

    await CourseInquiry.create({
        studentName,
        parentName,
        parentEmail,
        parentPhone,
        courseId: new mongoose.Types.ObjectId(courseId),
        studentAge,
        inquiryMessage,
        preferredContactMethod
    })
    res.status(201).json({
        message: "Course inquiry created successfully"
    })

}
// get all course inquiries
const getAllCourseInquiries = async (req: Request, res: Response) => {
    const courseInquiries = await CourseInquiry.find();
    if (courseInquiries.length === 0) {
        return res.status(404).json({
            message: "No course inquiries found"
        })
    }
    res.status(200).json({
        message: "Course inquiries retrieved successfully",
        data: courseInquiries
    })
}
// get course inquiry by id
const getCourseInquiryById = async (req: Request, res: Response) => {
    const { inquiryId } = req.params;
    const courseInquiry = await CourseInquiry.findById(inquiryId);
    if (!courseInquiry) {
        return res.status(404).json({
            message: "Course inquiry not found"
        })
    }
    // check valid course id object id
    if (!mongoose.Types.ObjectId.isValid(courseInquiry.courseId)) {
        return res.status(400).json({
            message: "Invalid course ID"
        })
    }
    res.status(200).json({
        message: "Course inquiry retrieved successfully",
        data: courseInquiry
    })
}
// update inquiry status by id
const updateInquiryStatusById = async (req: Request, res: Response) => {
    const { inquiryId } = req.params;
    const { inquiryStatus, adminNotes } = req.body;
    const courseInquiry = await CourseInquiry.findById(inquiryId);
    if (!courseInquiry) {
        return res.status(404).json({
            message: "Course inquiry not found"
        })
    }
    if (inquiryStatus) {
        courseInquiry.inquiryStatus = inquiryStatus;
    }
    if (adminNotes) {
        courseInquiry.adminNotes = adminNotes;
    }
    await courseInquiry.save();
    res.status(200).json({
        message: "Course inquiry updated successfully",
        data: courseInquiry
    })
}

// delete course inquiry by id
const deleteCourseInquiryById = async (req: Request, res: Response) => {
    const { inquiryId } = req.params;
    const courseInquiry = await CourseInquiry.findById(inquiryId);
    if (!courseInquiry) {
        return res.status(404).json({
            message: "Course inquiry not found"
        })
    }
    await CourseInquiry.findByIdAndDelete(inquiryId);
    res.status(200).json({
        message: "Course inquiry deleted successfully"
    })
}

// update course inquiry by id
const updateCourseInquiryById = async (req: Request, res: Response) => {
    const { inquiryId } = req.params;
    const { data, error } = courseInquirySchema.partial().safeParse(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            error: error.issues
        })
    }
    const { studentName, parentName, parentEmail, parentPhone, courseId, studentAge, preferredContactMethod } = data;
    if (!studentName || !parentName || !parentEmail || !parentPhone || !courseId || studentAge === undefined) {
        return res.status(400).json({
            message: "Missing required fields"
        })
    }
        // check if course is available
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }
    
    await CourseInquiry.findByIdAndUpdate(inquiryId, {
        studentName,
        parentName,
        parentEmail,
        parentPhone,
        courseId: new mongoose.Types.ObjectId(courseId),
        studentAge,
        preferredContactMethod
    })
    res.status(200).json({
        message: "Course inquiry updated successfully"
    })
}

export {
    createCourseInquiry,
    getAllCourseInquiries,
    getCourseInquiryById,
    updateInquiryStatusById,
    deleteCourseInquiryById,
    updateCourseInquiryById
}
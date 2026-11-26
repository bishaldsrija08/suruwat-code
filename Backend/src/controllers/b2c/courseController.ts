// Admin features
import { Request, Response } from "express";
import Course, { CourseStatus } from "../../models/courses/course.model";
import { isValidObjectId } from "mongoose";

// - Create a course
const createCourse = async (req: Request, res: Response) => {
    const { courseTitle, courseDescription, courseSlug, courseCategory, courseLevel, courseThumbnail, courseAgeGroupMin, courseAgeGroupMax, courseStatus, courseIsFeatured, courseDisplayOrder, courseShortDescription, courseLearningOutcomes, coursePrerequisites, courseModules, coursePrice, courseDuration } = req.body;

    if (!courseTitle || !courseDescription || !courseSlug || !courseLevel || courseAgeGroupMin === undefined || courseAgeGroupMax === undefined || !courseDuration || !courseShortDescription || !coursePrice || !courseCategory || !courseAgeGroupMin || !courseDuration || !courseThumbnail) {
        return res.status(400).json({
            message: "Missing required fields"
        })
    }
    const isvalid = isValidObjectId(courseCategory);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid category ID"
        })
    }
    await Course.create({
        courseTitle,
        courseDescription,
        courseSlug,
        courseCategory,
        courseLevel,
        courseThumbnail,
        courseAgeGroupMin,
        courseAgeGroupMax,
        courseStatus,
        courseIsFeatured,
        courseDisplayOrder,
        courseShortDescription,
        courseLearningOutcomes,
        coursePrerequisites,
        courseModules,
        coursePrice,
        courseDuration
    })
    res.status(201).json({
        message: "Course created successfully"
    })
}
// - Update course details.
// - Delete or archive a course.
// - Publish/unpublish a course.
// - Mark courses as featured.
// - Filter and search courses.
// - Manage course modules and learning outcomes.



// Public features
// - Get all published courses.
const getAllPublishedCourses = async (req: Request, res: Response) => {
    const courses = await Course.find({
        courseStatus: CourseStatus.PUBLISHED
    })
    if (courses.length === 0) {
        return res.status(404).json({
            message: "No published courses found"
        })
    }

    res.status(200).json({
        message: "Published courses fetched successfully",
        data: courses
    })
}
// - Get a course by slug.
const getCourseBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const course = await Course.findOne({
        courseSlug: slug,
        courseStatus: CourseStatus.PUBLISHED
    })
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }
    res.status(200).json({
        message: "Course fetched successfully",
        data: course
    })
}
// - Filter courses by category and difficulty level.
const filterCourses = async (req: Request, res: Response)=>{
    const { category, level } = req.query;
}
// - Search courses by title.


export { createCourse, getAllPublishedCourses, getCourseBySlug };
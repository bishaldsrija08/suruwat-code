// Admin features
import { Request, Response } from "express";
import Course, { CourseStatus } from "../../models/courses/course.model";
import { isValidObjectId } from "mongoose";
import { courseSchema } from "../../utils/zod";

// - Create a course
const createCourse = async (req: Request, res: Response) => {
    const { error, data } = courseSchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            error: error.issues
        })
    }
    const { courseTitle, courseDescription, courseSlug, courseCategory, courseLevel, courseThumbnail, courseAgeGroupMin, courseAgeGroupMax, courseStatus, courseIsFeatured, courseDisplayOrder, courseShortDescription, courseLearningOutcomes, coursePrerequisites, courseModules, coursePrice, courseDuration } = data;

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
const updateCourse = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    if (!courseId) {
        return res.status(400).json({
            message: "Course ID is required"
        })
    }

    const isvalid = isValidObjectId(courseId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid course ID"
        })
    }

    const { error, data } = courseSchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            error: error.issues
        })
    }

    const { courseTitle, courseDescription, courseSlug, courseCategory, courseLevel, courseThumbnail, courseAgeGroupMin, courseAgeGroupMax, courseStatus, courseIsFeatured, courseDisplayOrder, courseShortDescription, courseLearningOutcomes, coursePrerequisites, courseModules, coursePrice, courseDuration } = data;

    if (!courseTitle || !courseDescription || !courseSlug || !courseLevel || courseAgeGroupMin === undefined || courseAgeGroupMax === undefined || !courseDuration || !courseShortDescription || !coursePrice || !courseCategory || !courseAgeGroupMin || !courseDuration || !courseThumbnail) {
        return res.status(400).json({
            message: "Missing required fields"
        })
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }

    await Course.findByIdAndUpdate(courseId, {
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
    res.status(200).json({
        message: "Course updated successfully"
    })
}

// - Delete or archive a course.
const deleteCoure = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    if (!courseId) {
        return res.status(400).json({
            message: "Course ID is required"
        })
    }

    const isvalid = isValidObjectId(courseId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid course ID"
        })
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }

    await Course.findByIdAndDelete(courseId);
    res.status(200).json({
        message: "Course deleted successfully"
    })
}
// - Publish/archived a course.
const publishUnpublishCourse = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    if (!courseId) {
        return res.status(400).json({
            message: "Course ID is required"
        })
    }
    const isvalid = isValidObjectId(courseId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid course ID"
        })
    }
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }
    course.courseStatus = course.courseStatus === CourseStatus.PUBLISHED ? CourseStatus.ARCHIVED : CourseStatus.PUBLISHED;
    await course.save();
    res.status(200).json({
        message: `Course ${course.courseStatus === CourseStatus.PUBLISHED ? "published" : "archived"} successfully`
    })
}
// - Mark courses as featured.
const markCourseAsFeatured = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    if (!courseId) {
        return res.status(400).json({
            message: "Course ID is required"
        })
    }
    const isvalid = isValidObjectId(courseId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid course ID"
        })
    }
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }
    course.courseIsFeatured = !course.courseIsFeatured;
    await course.save();
    res.status(200).json({
        message: `Course ${course.courseIsFeatured ? "marked as featured" : "unmarked as featured"} successfully`
    })
}
// - Filter and search courses.
const filterAndSearchCourses = async (req: Request, res: Response) => {
    const { category, level, search } = req.query;
    if (!category && !level && !search) {
        return res.status(400).json({
            message: "At least one filter or search query is required"
        })
    }
    // Implement the filtering and searching logic here
    
}
// - Manage course modules and learning outcomes.
const manageCourseModulesAndLearningOutcomes = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    if (!courseId) {
        return res.status(400).json({
            message: "Course ID is required"
        })
    }
    if (!isValidObjectId(courseId)) {
        return res.status(400).json({
            message: "Invalid course ID"
        })
    }
    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        })
    }

}

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
const filterCourses = async (req: Request, res: Response) => {
    const { category, level } = req.query;
    if (!category && !level) {
        return res.status(400).json({
            message: "At least one filter query is required"
        })
    }
    // Implement the filtering logic here

}
// - Search courses by title.
const searchCourses = async (req: Request, res: Response) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({
            message: "Title query is required"
        })
    }
    
    if (typeof title !== "string") {
        return res.status(400).json({
            message: "Title query must be a string"
        })
    }
    const courses = await Course.find({
        courseTitle: { $regex: title, $options: "i" },
        courseStatus: CourseStatus.PUBLISHED
    })
    if (courses.length === 0) {
        return res.status(404).json({
            message: "No courses found matching the search criteria"
        })
    }
    res.status(200).json({
        message: "Courses searched successfully",
        data: courses
    })
}


export { createCourse, getAllPublishedCourses, getCourseBySlug, updateCourse, deleteCoure, publishUnpublishCourse, markCourseAsFeatured, searchCourses };
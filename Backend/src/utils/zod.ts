import { z } from 'zod';
import { CategoryStatus } from '../models/courses/courseCategory.model';
import { CourseLevel, CourseStatus } from '../models/courses/course.model';
import { InstructorStatus } from '../models/instructor/instructor.model';

export const courseCategorySchema = z.object({
    categoryName: z.string().min(1, "Course category name is required"),
    categoryDescription: z.string().optional(),
    categoryImage: z.string().optional(),
    categoryStatus: z.enum([CategoryStatus.ACTIVE, CategoryStatus.INACTIVE]).optional(),
    categoryDisplayOrder: z.number().optional()
});

export const courseSchema = z.object({
    courseTitle: z.string().min(1, "Course title is required"),
    courseShortDescription: z.string().optional(),
    courseDescription: z.string().optional(),
    courseCategory: z.string().min(1, "Course category is required"),
    courseThumbnail: z.string().optional(),
    courseAgeGroupMin: z.number().optional(),
    courseAgeGroupMax: z.number().optional(),
    courseDuration: z.string().optional(),
    courseLevel: z.enum([CourseLevel.BEGINNER, CourseLevel.INTERMEDIATE, CourseLevel.ADVANCED]).optional(),
    courseLearningOutcomes: z.array(z.string()).optional(),
    coursePrerequisites: z.array(z.string()).optional(),
    courseModules: z.array(z.string()).optional(),
    coursePrice: z.number().optional(),
    courseStatus: z.enum([CourseStatus.DRAFT, CourseStatus.PUBLISHED, CourseStatus.ARCHIVED]).optional(),
    courseIsFeatured: z.boolean().optional(),
    courseDisplayOrder: z.number().optional(),
})

export const instructorSchema = z.object({
    instructorName: z.string().min(1, "Instructor name is required"),
    instructorDesignation: z.string().min(1, "Instructor designation is required"),
    instructorProfileImage: z.string().optional(),
    instructorBio: z.string().optional(),
    instructorExpertise: z.array(z.string()).optional(),
    instructorExperience: z.number().optional(),
    instructorQualifications: z.array(z.string()).optional(),
    instructorSocialLinks: z.object({
        linkedin: z.string().optional(),
        github: z.string().optional(),
        portfolio: z.string().optional(),
        youtube: z.string().optional(),
    }).optional(),
    instructorStatus: z.enum([InstructorStatus.ACTIVE, InstructorStatus.INACTIVE]).optional(),
    instructorDisplayOrder: z.number().optional()
})
import { z } from 'zod';
import { CategoryStatus } from '../models/courses/courseCategory.model';
import { CourseLevel, CourseStatus } from '../models/courses/course.model';
import { InstructorStatus } from '../models/instructor/instructor.model';
import { InquiryStatus, PreferredContact } from '../models/crm/courseInquiry.model';

export const courseCategorySchema = z.object({
    categoryName: z.string().min(1, "Course category name is required"),
    categoryDescription: z.string().optional(),
    categoryImage: z.string().optional(),
    categoryStatus: z.enum(CategoryStatus).optional(),
    categoryDisplayOrder: z.number().optional()
});

export const courseSchema = z.object({
    courseTitle: z.string().min(1, "Course title is required"),
    courseShortDescription: z.string().optional(),
    courseDescription: z.string().optional(),
    courseCategoryId: z.string().min(1, "Course category is required"),
    courseThumbnail: z.string().optional(),
    courseAgeGroupMin: z.number().optional(),
    courseAgeGroupMax: z.number().optional(),
    courseDuration: z.string().optional(),
    courseLevel: z.enum(CourseLevel).optional(),
    courseLearningOutcomes: z.array(z.string()).optional(),
    coursePrerequisites: z.array(z.string()).optional(),
    courseModules: z.array(z.string()).optional(),
    coursePrice: z.number().optional(),
    courseStatus: z.enum(CourseStatus).optional(),
    courseIsFeatured: z.boolean().optional(),
    courseDisplayOrder: z.number().optional(),
    courseInstructorId: z.string().min(1, "Course instructor is required")
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
    instructorStatus: z.enum(InstructorStatus).optional(),
    instructorDisplayOrder: z.number().optional()
})

export const courseInquirySchema = z.object({
    studentName: z.string().min(1, "Student name is required"),
    parentName: z.string().min(1, "Parent name is required"),
    parentEmail: z.string().email("Invalid email address"),
    parentPhone: z.string().min(1, "Parent phone is required"),
    courseId: z.string().min(1, "Course ID is required"),
    studentAge: z.number().min(0, "Student age must be a positive number").max(18, "Student age must not exceed 18 years"),
    inquiryMessage: z.string().optional(),
    preferredContactMethod: z.enum(PreferredContact).optional(),
    inquiryStatus: z.enum(InquiryStatus).optional(),
    adminNotes: z.string().optional()
})
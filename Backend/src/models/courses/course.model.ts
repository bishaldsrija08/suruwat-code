import mongoose, { Document, Schema } from "mongoose";

// Enums
export enum CourseLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",
}

export enum CourseStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}
interface ICourseCategory extends Document {
    courseTitle: string;
    courseSlug: string;
    courseShortDescription: string;
    courseDescription: string;
    courseCategory: mongoose.Types.ObjectId;
    courseThumbnail: string;
    courseAgeGroupMin: number;
    courseAgeGroupMax: number;
    courseDuration: string;
    courseLevel: CourseLevel;
    courseLearningOutcomes: string[];
    coursePrerequisites: string[];
    courseModules: string[];
    coursePrice: number;
    courseStatus: CourseStatus;
    courseIsFeatured: boolean;
    courseDisplayOrder: number;
}

const courseCategorySchema = new Schema<ICourseCategory>({
    courseTitle: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
        maxlength: [100, "Course title must not exceed 100 characters"],
    },
    courseSlug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
        trim: true,
    },
    courseShortDescription: {
        type: String,
        required: [true, "Short description is required"],
        trim: true,
        maxlength: [500, "Short description must not exceed 500 characters"],
    },
    courseDescription: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [5000, "Description must not exceed 5000 characters"],
    },
    courseCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseCategory",
        required: [true, "Course category is required"],
    },
    courseThumbnail: {
        type: String,
        trim: true,
        required: [true, "Course thumbnail is required"]
    },
    courseAgeGroupMin: {
        type: Number,
        min: [0, "Age group must be a positive number"],
        required: [true, "Age group is required"],
    },
    courseAgeGroupMax: {
        type: Number,
        max: [18, "Age group must not exceed 18"],
        required: [true, "Age group is required"],
    },
    courseDuration: {
        type: String,
        required: [true, "Course duration is required"],
    },
    courseLevel: {
        type: String,
        enum: Object.values(CourseLevel),
        required: [true, "Course level is required"],
    },
    courseLearningOutcomes: {
        type: [String],
    },
    coursePrerequisites: {
        type: [String],
    },
    courseModules: {
        type: [String],
    },
    coursePrice: {
        type: Number,
        required: [true, "Course price is required"],
        min: [0, "Course price must be a positive number"],
    },
    courseStatus: {
        type: String,
        enum: Object.values(CourseStatus),
        default: CourseStatus.DRAFT,
    },
    courseIsFeatured: {
        type: Boolean,
        default: false,
    },
    courseDisplayOrder: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
});

// Indexes
courseCategorySchema.index({ courseStatus: 1, courseDisplayOrder: 1 });
courseCategorySchema.index({ courseTitle: 1, courseSlug: 1 });

const Course = mongoose.model<ICourseCategory>("Course", courseCategorySchema);

export default Course;
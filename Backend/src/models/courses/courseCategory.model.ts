import mongoose, { Document, Schema } from "mongoose";

export enum CategoryStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export interface ICourseCategory extends Document {
    categoryName: string;
    categorySlug: string;
    categoryDescription: string;
    categoryImage?: string;
    categoryStatus: CategoryStatus;
    categoryDisplayOrder: number;
}

const courseCategorySchema = new Schema<ICourseCategory>({
    categoryName: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        maxlength: [100, "Category name must not exceed 100 characters"]
    },
    categorySlug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
        trim: true,
        lowercase: true
    },
    categoryDescription: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        maxlength: [500, "Description must not exceed 500 characters"]
    },
    categoryImage: {
        type: String,
        trim: true
    },
    categoryStatus: {
        type: String,
        enum: Object.values(CategoryStatus),
        default: CategoryStatus.ACTIVE
    },
    categoryDisplayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

// indexes
courseCategorySchema.index({ categoryStatus: 1, categoryDisplayOrder: 1 });
courseCategorySchema.index({ categoryName: 1 })

const CourseCategory = mongoose.model<ICourseCategory>("CourseCategory", courseCategorySchema);

export default CourseCategory;
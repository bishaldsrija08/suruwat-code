import mongoose, { Document, Schema } from "mongoose";

// Enums
export enum InstructorStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface IInstructor extends Document {
    instructorName: string;
    instructorSlug: string;
    instructorDesignation: string;
    instructorProfileImage?: string;
    instructorBio?: string;
    instructorExpertise: string[];
    instructorExperience: number;
    instructorQualifications: string[];
    instructorSocialLinks: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
        youtube?: string;
    };
    instructorStatus: InstructorStatus;
    instructorDisplayOrder: number;
}

const instructorSchema = new Schema<IInstructor>({
    instructorName: {
        type: String,
        required: [true, "Instructor name is required"],
        trim: true,
        maxlength: [100, "Instructor name must not exceed 100 characters"],
    },
    instructorSlug: {
        type: String,
        required: [true, "Slug is required"],
        unique: true,
        trim: true,
    },
    instructorDesignation: {
        type: String,
        required: [true, "Instructor designation is required"],
        trim: true,
        maxlength: [100, "Instructor designation must not exceed 100 characters"],
    },
    instructorProfileImage: {
        type: String,
        trim: true
    },
    instructorBio: {
        type: String,
        trim: true,
        maxlength: [1000, "Instructor bio must not exceed 1000 characters"]
    },
    instructorExpertise: {
        type: [String],
        trim: true,
        default: []
    },
    instructorExperience: {
        type: Number,
        min: [0, "Instructor experience must be a positive number"],
        required: [true, "Instructor experience is required"]
    },
    instructorQualifications: {
        type: [String],
        trim: true,
        default: []
    },
    instructorSocialLinks: {
        linkedin: {
            type: String,
            trim: true
        },
        github: {
            type: String,
            trim: true
        },
        portfolio: {
            type: String,
            trim: true
        },
        youtube: {
            type: String,
            trim: true
        }
    },
    instructorStatus: {
        type: String,
        enum: Object.values(InstructorStatus),
        default: InstructorStatus.ACTIVE,
        required: [true, "Instructor status is required"]
    },
    instructorDisplayOrder: {
        type: Number,
        min: [0, "Instructor display order must be a positive number"],
        required: [true, "Instructor display order is required"],
        default: 0
    },
}, {
    timestamps: true
})

// Indexes
instructorSchema.index({ instructorStatus: 1, instructorDisplayOrder: 1 });
instructorSchema.index({ instructorName: 1 });

const Instructor = mongoose.model<IInstructor>("Instructor", instructorSchema);

export default Instructor;
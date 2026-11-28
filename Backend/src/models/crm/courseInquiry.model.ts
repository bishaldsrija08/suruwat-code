import mongoose, { Document, Schema } from "mongoose";

// Enums
export enum InquiryStatus {
    NEW = "new",
    CONTACTED = "contacted",
    INTERESTED = "interested",
    NOT_INTERESTED = "not_interested",
    CONVERTED = "converted",
    CLOSED = "closed"
}

export enum PreferredContact {
    PHONE = "phone",
    EMAIL = "email",
    WHATSAPP = "whatsapp"
}

export interface ICourseInquiry extends Document {
    studentName: string;
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    courseId: mongoose.Types.ObjectId;
    studentAge: number;
    inquiryMessage?: string;
    preferredContactMethod: PreferredContact;
    inquiryStatus: InquiryStatus;
    adminNotes?: string;
}

const courseInquirySchema = new Schema({
    studentName: {
        type: String,
        required: [true, "Student name is required"],
        trim: true,
    },
    parentName: {
        type: String,
        required: [true, "Parent name is required"],
        trim: true
    },
    parentEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    parentPhone: {
        type: String,
        required: [true, "Parent phone is required"],
        trim: true,
        unique: true
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: [true, "Course ID is required"]
    },
    studentAge: {
        type: Number,
        required: [true, "Student age is required"],
        min: [0, "Student age must be a positive number"],
        trim: true,
        max: [18, "Student age must not exceed 18 years"]
    },
    inquiryMessage: {
        type: String,
        trim: true,
        maxlength: [1000, "Inquiry message must not exceed 1000 characters"]
    },
    preferredContactMethod: {
        type: String,
        enum: Object.values(PreferredContact),
        default: PreferredContact.PHONE,
        trim: true
    },
    // By admins
    inquiryStatus: {
        type: String,
        enum: Object.values(InquiryStatus),
        default: InquiryStatus.NEW,
        trim: true
    },
    adminNotes: {
        type: String,
        trim: true,
        maxlength: [1000, "Admin notes must not exceed 1000 characters"]
    }
}, {
    timestamps: true
})

// Indexes
courseInquirySchema.index({ inquiryStatus: 1 });
courseInquirySchema.index({ courseId: 1 });

const CourseInquiry = mongoose.model<ICourseInquiry>("CourseInquiry", courseInquirySchema);

export default CourseInquiry;
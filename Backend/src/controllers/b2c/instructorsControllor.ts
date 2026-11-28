import { Request, Response } from "express";
import { instructorSchema } from "../../utils/zod";
import Instructor, { InstructorStatus } from "../../models/instructor/instructor.model";
import { isValidObjectId } from "mongoose";

// Admin
// - Create instructor
const createInstructor = async (req: Request, res: Response) => {
    const { data, error } = instructorSchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({ error: error.issues });
    }
    const { instructorName, instructorDesignation, instructorBio, instructorExpertise, instructorExperience, instructorQualifications, instructorSocialLinks, instructorStatus, instructorDisplayOrder } = data;

    // Generate a unique slug for the instructor based on the instructor name
    const instructorSlug = instructorName.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    // const instructorProfileImage
    if (!instructorName || !instructorDesignation || !instructorExperience || !instructorSlug) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    await Instructor.create({
        instructorName,
        instructorSlug,
        instructorDesignation,
        instructorBio,
        instructorExpertise,
        instructorExperience,
        instructorQualifications,
        instructorSocialLinks,
        instructorStatus,
        instructorDisplayOrder,
        instructorProfileImage: "image.png"
    });
    return res.status(201).json({ message: "Instructor created successfully" });
}
// - Get all instructors
const getAllInstructors = async (req: Request, res: Response) => {
    const instructors = await Instructor.find();
    if (instructors.length === 0) {
        return res.status(404).json({ message: "No instructors found" });
    }
    return res.status(200).json({
        message: "Instructors fetched successfully",
        data: instructors
    })
}

// - Get instructor by ID
const getInstructorById = async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    if (!instructorId) {
        return res.status(400).json({ message: "Instructor ID is required" });
    }
    // check if instructorId is a valid ObjectId
    if (!isValidObjectId(instructorId)) {
        return res.status(400).json({ message: "Invalid instructor ID" });
    }

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
    }
    return res.status(200).json({
        message: "Instructor fetched successfully",
        data: instructor
    })
}

// - Update instructor
const updateInstructor = async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    if (!instructorId) {
        return res.status(400).json({ message: "Instructor ID is required" });
    }

    // check if instructorId is a valid ObjectId
    if (!isValidObjectId(instructorId)) {
        return res.status(400).json({ message: "Invalid instructor ID" });
    }

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
    }
    const { data, error } = instructorSchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({ error: error.issues });
    }

    const { instructorName, instructorDesignation, instructorBio, instructorExpertise, instructorExperience, instructorQualifications, instructorSocialLinks, instructorStatus, instructorDisplayOrder } = data;

    // Generate a unique slug for the instructor based on the instructor name
    const instructorSlug = instructorName.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    // const instructorProfileImage
    if (!instructorName || !instructorDesignation || !instructorExperience || !instructorSlug) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    await Instructor.findByIdAndUpdate(instructorId, {
        instructorName,
        instructorSlug,
        instructorDesignation,
        instructorBio,
        instructorExpertise,
        instructorExperience,
        instructorQualifications,
        instructorSocialLinks,
        instructorStatus,
        instructorDisplayOrder,
        instructorProfileImage: "image.png"
    }, { new: true });

    return res.status(200).json({ message: "Instructor updated successfully" });

}
// - Delete instructor
const deleteInstructor = async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    if (!instructorId) {
        return res.status(400).json({ message: "Instructor ID is required" });
    }

    // check if instructorId is a valid ObjectId
    if (!isValidObjectId(instructorId)) {
        return res.status(400).json({ message: "Invalid instructor ID" });
    }

    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
    }

    await Instructor.findByIdAndDelete(instructorId);
    return res.status(200).json({ message: "Instructor deleted successfully" });
}

// activate or deactivate instructors
const toggleInstructorStatus = async (req: Request, res: Response) => {
    const { instructorId } = req.params;
    if (!instructorId || !isValidObjectId(instructorId)) {
        return res.status(400).json({ message: "Instructor ID is required and must be a valid" });
    }
    const instructor = await Instructor.findById(instructorId);
    if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
    }
    const newStatus = instructor.instructorStatus === InstructorStatus.ACTIVE ? InstructorStatus.INACTIVE : InstructorStatus.ACTIVE;
    await Instructor.findByIdAndUpdate(instructorId, { instructorStatus: newStatus }, { new: true });
    return res.status(200).json({ message: "Instructor status updated successfully" });
}

// - Search instructors
const searchInstructors = async (req: Request, res: Response) => {
    const { search } = req.query;
    if (!search || typeof search !== "string") {
        return res.status(400).json({ message: "Search query is required" });
    }
    const instructors = await Instructor.find({
        instructorName: {
            $regex: search,
            $options: "i"
        }
    });
    return res.status(200).json({
        message: "Instructors fetched successfully",
        data: instructors
    })
}
// - Filter active/inactive instructors
const filterInstructors = async (req: Request, res: Response) => {
    const { status } = req.query;
    if (!status || typeof status !== "string" || InstructorStatus.ACTIVE !== status && InstructorStatus.INACTIVE !== status) {
        return res.status(400).json({ message: "Invalid status query" });
    }
    const instructors = await Instructor.find({ instructorStatus: status });
    if (instructors.length === 0) {
        return res.status(404).json({ message: "No instructors found" });
    }

    return res.status(200).json({
        message: "Instructors fetched successfully",
        data: instructors
    })
}

// Public
// - Get all active instructors
const getActiveInstructors = async (req: Request, res: Response) => {
    const instructors = await Instructor.find({ instructorStatus: InstructorStatus.ACTIVE });
    if (instructors.length === 0) {
        return res.status(404).json({ message: "No active instructors found" });
    }
    return res.status(200).json({
        message: "Active instructors fetched successfully",
        data: instructors
    })
}
// - Get active instructor profile by slug
const getInstructorProfileBySlug = async (req: Request, res: Response) => {
    const { instructorSlug } = req.params;
    if (!instructorSlug) {
        return res.status(400).json({ message: "Instructor slug is required" });
    }
    const instructor = await Instructor.findOne({ instructorSlug, instructorStatus: InstructorStatus.ACTIVE });
    if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
    }
    return res.status(200).json({
        message: "Instructor fetched successfully",
        data: instructor
    })
}

export { createInstructor, getAllInstructors, getInstructorById, updateInstructor, deleteInstructor, searchInstructors, filterInstructors, toggleInstructorStatus, getActiveInstructors, getInstructorProfileBySlug };
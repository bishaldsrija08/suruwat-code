import { Request, Response } from "express";
import CourseCategory, { CategoryStatus } from "../../models/courses/courseCategory.model";
import { isValidObjectId } from "mongoose";
import { courseCategorySchema } from "../../utils/zod";

// Create category
const createCategory = async (req: Request, res: Response) => {
    // Zod validataion
    const { data, error } = courseCategorySchema.safeParse(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            error: error.issues
        })
    }

    const { categoryName, categoryDescription, categorySlug, categoryStatus, categoryDisplayOrder } = data;
    // const categoryImage =

    if (!categoryName || !categoryDescription || !categorySlug || !categoryStatus || categoryDisplayOrder === undefined) {
        return res.status(400).json({
            message: "Missing required fields"
        })
    }

    await CourseCategory.create({
        categoryName,
        categoryDescription,
        categorySlug,
        categoryStatus,
        categoryDisplayOrder
    })

    res.status(201).json({
        message: "Category created successfully"
    })
}

// Get active categories
const getActiveCategories = async (req: Request, res: Response) => {
    const activeCategories = await CourseCategory.find({
        categoryStatus: CategoryStatus.ACTIVE
    })
    if (activeCategories.length === 0) {
        return res.status(404).json({
            message: "No active categories found"
        })
    }
    res.status(200).json({
        message: "Active categories fetched successfully",
        data: activeCategories
    })
}

// Get all categories
const getAllCategories = async (req: Request, res: Response) => {
    const categories = await CourseCategory.find();
    if (categories.length === 0) {
        res.status(404).json({
            message: "No categories found"
        })
    }

    res.status(200).json({
        message: "Categories fetched successfully",
        data: categories
    })
}

// Get category details
const getCategoryDetails = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const isvalid = isValidObjectId(categoryId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid category ID"
        })
    }
    const category = await CourseCategory.findById(categoryId);
    if (!category) {
        return res.status(404).json({
            message: "Category not found"
        })
    }
    res.status(200).json({
        message: "Category details fetched successfully",
        data: category
    })
}

// Update category
const updateCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const isvalid = isValidObjectId(categoryId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid category ID"
        })
    }

    const category = await CourseCategory.findById(categoryId);
    if (!category) {
        return res.status(404).json({
            message: "Category not found"
        })
    }
    const { categoryName, categoryDescription, categorySlug, categoryStatus, categoryDisplayOrder } = req.body;
    // const categoryImage =

    if (!categoryName || !categoryDescription || !categorySlug || !categoryStatus || categoryDisplayOrder === undefined) {
        return res.status(400).json({
            message: "Missing required fields"
        })
    }
    await CourseCategory.findByIdAndUpdate(categoryId, {
        categoryName,
        categoryDescription,
        categorySlug,
        categoryStatus,
        categoryDisplayOrder
    })
    res.status(200).json({
        message: "Category updated successfully"
    })
}

// Activate/deactivate
const toggleCategoryStatus = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const isvalid = isValidObjectId(categoryId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid category ID"
        })
    }
    const category = await CourseCategory.findById(categoryId);
    if (!category) {
        return res.status(404).json({
            message: "Category not found"
        })
    }
    const newStatus = category.categoryStatus === CategoryStatus.ACTIVE ? CategoryStatus.INACTIVE : CategoryStatus.ACTIVE;
    await CourseCategory.findByIdAndUpdate(categoryId, {
        categoryStatus: newStatus
    })
    res.status(200).json({
        message: "Category status updated successfully"
    })
}


// Delete category

// Use soft deactivation instead of permanently deleting categories. Before deleting a category, also check whether any courses are associated with it.

const deleteCategory = async (req: Request, res: Response) => {
    // Use soft deactivation instead of permanently deleting categories. Before deleting a category, also check whether any courses are associated with it.=> in futue
    const { categoryId } = req.params;
    const isvalid = isValidObjectId(categoryId);
    if (!isvalid) {
        return res.status(400).json({
            message: "Invalid category ID"
        })
    }
    const category = await CourseCategory.findByIdAndDelete(categoryId);
    if (!category) {
        return res.status(404).json({
            message: "Category not found"
        })
    }
    res.status(200).json({
        message: "Category deleted successfully"
    })
}

export {
    createCategory,
    getAllCategories,
    getActiveCategories,
    getCategoryDetails,
    updateCategory,
    toggleCategoryStatus,
    deleteCategory
}
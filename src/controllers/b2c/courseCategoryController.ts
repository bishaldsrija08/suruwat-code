import { Request, Response } from "express";
import CourseCategory from "../../models/courses/courseCategory.model";

// Create category
const createCategory = async (req: Request, res: Response) => {
    const { categoryName, categoryDescription, categorySlug, categoryStatus, categoryDisplayOrder } = req.body;

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

// Get all categories
const getAllCategories = async (req: Request, res: Response) => {
    const categories = await CourseCategory.find();
    if(categories.length === 0){
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


// Update category


// Activate/deactivate


// Delete category

export{
    createCategory,
    getAllCategories
}
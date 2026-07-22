import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { TourCategoryServices } from "./tourCategory.service";
import { catchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

const createTourCategory = catchAsync(
    async (
        req: Request,
        res: Response,
    ) => {

        const result =
            await TourCategoryServices.createTourCategory(
                req.body
            );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Tour Category created successfully",
            data: result,
        });
    }
);

const getAllTourCategories = catchAsync(
    async (
        req: Request,
        res: Response,
    ) => {

        const result =
            await TourCategoryServices.getAllTourCategories(
                req.query as Record<string, string>
            );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All Tour Categories retrieved successfully",
            data: result.data,
            meta: result.meta,
        });
    }
);

const getSingleTourCategory = catchAsync(
    async (
        req: Request,
        res: Response,

    ) => {

        const result =
            await TourCategoryServices.getSingleTourCategory(
                req.params.id as string
            );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Tour Category retrieved successfully",
            data: result.data,
        });
    }
);

const updateTourCategory = catchAsync(
    async (
        req: Request,
        res: Response,

    ) => {

        const result =
            await TourCategoryServices.updateTourCategory(
                req.params.id as string,
                req.body
            );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Tour Category updated successfully",
            data: result,
        });
    }
);

const deleteTourCategory = catchAsync(
    async (
        req: Request,
        res: Response,

    ) => {

        await TourCategoryServices.deleteTourCategory(
            req.params.id as string
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Tour Category deleted successfully",
            data: null,
        });
    }
);

export const TourCategoryControllers = {
    createTourCategory,
    getAllTourCategories,
    getSingleTourCategory,
    updateTourCategory,
    deleteTourCategory,
};
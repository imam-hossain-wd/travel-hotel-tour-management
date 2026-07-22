import {  Request, Response } from "express";
import httpStatus from "http-status-codes";

import { GuideServices } from "./guide.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createGuide = catchAsync(
    async (
        req: Request,
        res: Response,
    ) => {

        const result = await GuideServices.createGuide(
            req.body
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Guide created successfully",
            data: result,
        });
    }
);

const updateGuide = catchAsync(
    async (
        req: Request,
        res: Response,
        
    ) => {

        const result =
            await GuideServices.updateGuide(
                req.params.id as string,
                req.body
            );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Guide updated successfully",
            data: result,
        });
    }
);

const deleteGuide = catchAsync(
    async (
        req: Request,
        res: Response,
        
    ) => {

        await GuideServices.deleteGuide(
            req.params.id as string
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Guide deleted successfully",
            data: null,
        });
    }
);

const getSingleGuide = catchAsync(
    async (
        req: Request,
        res: Response,
        
    ) => {

        const result =
            await GuideServices.getSingleGuide(
                req.params.id as string
            );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Guide retrieved successfully",
            data: result.data,
        });
    }
);

const getAllGuides = catchAsync(
    async (
        req: Request,
        res: Response,
        
    ) => {

        const result =
            await GuideServices.getAllGuides(
                req.query as Record<
                    string,
                    string
                >
            );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All guides retrieved successfully",
            data: result.data,
            meta: result.meta,
        });
    }
);

export const GuideControllers = {
    createGuide,
    updateGuide,
    deleteGuide,
    getSingleGuide,
    getAllGuides,
};
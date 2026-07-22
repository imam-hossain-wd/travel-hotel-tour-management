import { Request, Response } from "express";
import { IHotel } from "./hotel.interface";
import { HotelService } from "./hotel.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createHotel = catchAsync(async (req: Request, res: Response) => {

    const body = req.body;

    const files = req.files as {
        thumbnail?: Express.Multer.File[];
        images?: Express.Multer.File[];
    };

    const payload: IHotel = {
        ...body,
        thumbnail: files?.thumbnail?.[0]?.path,
        images: files?.images?.map(file => file.path) || [],
    };

    const result = await HotelService.createHotel(payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Hotel created successfully",
        data: result,
    });
});

const getAllHotels = catchAsync(async (req: Request, res: Response) => {

    const result = await HotelService.getAllHotels(
        req.query as Record<string, string>
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Hotels retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});

const getSingleHotel = catchAsync(async (req: Request, res: Response) => {

    const result = await HotelService.getSingleHotel(req.params.slug as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Hotel retrieved successfully",
        data: result,
    });
});

const updateHotel = catchAsync(async (req: Request, res: Response) => {

    const body = req.body;

    const files = req.files as {
        thumbnail?: Express.Multer.File[];
        images?: Express.Multer.File[];
    };

    const payload = {
        ...body,
    };

    if (files?.thumbnail?.length) {
        payload.thumbnail = files.thumbnail[0].path;
    }

    if (files?.images?.length) {
        payload.images = files.images.map(file => file.path);
    }

    const result = await HotelService.updateHotel(
        req.params.id as string,
        payload
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Hotel updated successfully",
        data: result,
    });
});

const deleteHotel = catchAsync(async (req: Request, res: Response) => {

    const result = await HotelService.deleteHotel(req.params.id as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Hotel deleted successfully",
        data: result,
    });
});

export const HotelController = {
    createHotel,
    getAllHotels,
    getSingleHotel,
    updateHotel,
    deleteHotel,
};
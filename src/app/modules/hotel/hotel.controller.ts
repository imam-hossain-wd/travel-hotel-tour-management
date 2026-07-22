import { Request, Response } from "express";
import { HotelService } from "./hotel.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


import { HotelImageType } from "./hotel.interface";

const createHotel = catchAsync(async (req: Request, res: Response) => {

    const files = req.files as Express.Multer.File[];
    const images = files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        type: index === 0 ? HotelImageType.THUMBNAIL : HotelImageType.COVER,
        alt: "",
        title: "",
        order: index,
    }));

    const payload = {
        ...req.body,
        images,
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
    const result = await HotelService.getSingleHotel(req.params.id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Hotel retrieved successfully",
        data: result,
    });
});

const updateHotel = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    const body = req.body;

    let images = body.images || [];

    if (files?.length) {
        const uploadedImages = files.map((file, index) => ({
            url: file.path,
            publicId: file.filename,
            type: index === 0 ? HotelImageType.THUMBNAIL : HotelImageType.COVER,
            alt: "",
            title: "",
            isPrimary: index === 0,
            order: index,
        }));

        images = uploadedImages;
    }

    const payload = {
        ...body,
        ...(files?.length && { images }),
    };

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

// const updateHotel = catchAsync(async (req: Request, res: Response) => {

//     const body = req.body;

//     const files = (req.files as Express.Multer.File[]) || [];

//     const images = files.map((file, index) => ({
//         url: file.path,
//         publicId: file.filename,
//         type: HotelImageType.OTHER,
//         alt: "",
//         title: "",
//         isPrimary: false,
//         order: index,
//     }));

//     const payload = {
//         ...body,
//     };

//     if (images.length > 0) {
//         payload.images = images;
//     }

//     const result = await HotelService.updateHotel(
//         req.params.id as string,
//         payload
//     );

//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Hotel updated successfully",
//         data: result,
//     });
// });

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
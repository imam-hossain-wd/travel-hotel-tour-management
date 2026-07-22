import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RoomImageType } from "./room.enum";
import { RoomService } from "./room.service";

const createRoom = catchAsync(async (req: Request, res: Response) => {

    const files = req.files as Express.Multer.File[];

    const images = files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        type: index === 0 ? RoomImageType.COVER : RoomImageType.OTHER,
        alt: "",
        title: "",
        isPrimary: index === 0,
        order: index,
    }));

    const payload = {
        ...req.body,
        images,
    };

    const result = await RoomService.createRoom(payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Room created successfully",
        data: result,
    });
});

const getAllRooms = catchAsync(async (req, res) => {

    const result = await RoomService.getAllRooms(
        req.query as Record<string, string>
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Rooms retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});

const getSingleRoom = catchAsync(async (req, res) => {

    const result = await RoomService.getSingleRoom(req.params.id as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room retrieved successfully",
        data: result,
    });
});

const updateRoom = catchAsync(async (req, res) => {

    const files = req.files as Express.Multer.File[];

    const newImages = files.map((file, index) => ({
        url: file.path,
        publicId: file.filename,
        type: RoomImageType.OTHER,
        alt: "",
        title: "",
        isPrimary: false,
        order: index,
    }));

    const payload = {
        ...req.body,
    };

    if (newImages.length) {
        payload.images = newImages;
    }

    const result = await RoomService.updateRoom(
        req.params.id as string,
        payload
    );

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room updated successfully",
        data: result,
    });
});

const deleteRoom = catchAsync(async (req, res) => {

    const result = await RoomService.deleteRoom(req.params.id as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room deleted successfully",
        data: result,
    });
});

export const RoomController = {
    createRoom,
    getAllRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
};

import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catchAsync';
import { sendResponse } from '../../../utils/sendResponse';
import { ITour } from './tour.interface';
import { TourService } from './tour.service';


const createTour = catchAsync(async (req: Request, res: Response) => {
    
    const images = (req.files as Express.Multer.File[]).map(
        file => file.path
    );

    const payload = {
        ...req.body,
        images,
    };

    const result = await TourService.createTour(payload);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Tour created successfully",
        data: result,
    });
});


const getAllTours = catchAsync(async (req: Request, res: Response) => {

    const query = req.query
    const result = await TourService.getAllTours(query as Record<string, string>);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tours retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await TourService.getSingleTour(slug as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour retrieved successfully',
        data: result,
    });
});
const updateTour = catchAsync(async (req: Request, res: Response) => {
    const payload: ITour = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file => file.path)
    }
    const result = await TourService.updateTour(req.params.id as string, payload);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour updated successfully',
        data: result,
    });
});
const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTour(id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});


export const TourController = {
    createTour,
    getAllTours,
    getSingleTour,
    updateTour,
    deleteTour,
};
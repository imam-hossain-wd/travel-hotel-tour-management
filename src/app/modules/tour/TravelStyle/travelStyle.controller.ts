import {  Request, Response } from "express";
import httpStatus from "http-status-codes";
import { TravelStyleServices } from "./travelStyle.service";
import { sendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";

const createTravelStyle = catchAsync(
  async (
    req: Request,
    res: Response,
  ) => {
    const result =
      await TravelStyleServices.createTravelStyle(
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Travel Style created successfully",
      data: result,
    });
  }
);

const getAllTravelStyles = catchAsync(
  async (
    req: Request,
    res: Response,
  ) => {
    const result =
      await TravelStyleServices.getAllTravelStyles(
        req.query as Record<string, string>
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel Styles retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleTravelStyle = catchAsync(
  async (
    req: Request,
    res: Response,
  ) => {
    const result =
      await TravelStyleServices.getSingleTravelStyle(
        req.params.id as string
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel Style retrieved successfully",
      data: result.data,
    });
  }
);

const updateTravelStyle = catchAsync(
  async (
    req: Request,
    res: Response,
  ) => {
    const result =
      await TravelStyleServices.updateTravelStyle(
        req.params.id as string,
        req.body
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel Style updated successfully",
      data: result,
    });
  }
);

const deleteTravelStyle = catchAsync(
  async (
    req: Request,
    res: Response,
  ) => {
    await TravelStyleServices.deleteTravelStyle(
      req.params.id as string
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Travel Style deleted successfully",
      data: null,
    });
  }
);

export const TravelStyleControllers = {
  createTravelStyle,
  getAllTravelStyles,
  getSingleTravelStyle,
  updateTravelStyle,
  deleteTravelStyle,
};
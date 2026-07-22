import httpStatus from "http-status-codes";
import { ITravelStyle } from "./travelStyle.interface";
import { TravelStyle } from "./travelStyle.model";
import { travelStyleSearchableFields } from "./travelStyle.constant";
import AppError from "../../../errorHelpers/AppError";
import { QueryBuilder } from "../../../utils/QueryBuilder";

const createTravelStyle = async (payload: ITravelStyle) => {
  const isExist = await TravelStyle.findOne({
    $or: [
      { name: payload.name },
      { slug: payload.slug },
    ],
  });

  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Travel Style already exists"
    );
  }

  return await TravelStyle.create(payload);
};

const getAllTravelStyles = async (
  query: Record<string, string>
) => {
  const queryBuilder = new QueryBuilder(
    TravelStyle.find(),
    query
  );

  const styles = queryBuilder
    .search(travelStyleSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    styles.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleTravelStyle = async (id: string) => {
  const style = await TravelStyle.findById(id);

  if (!style) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Travel Style not found"
    );
  }

  return {
    data: style,
  };
};

const updateTravelStyle = async (
  id: string,
  payload: Partial<ITravelStyle>
) => {
  const style = await TravelStyle.findById(id);

  if (!style) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Travel Style not found"
    );
  }

  return await TravelStyle.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteTravelStyle = async (id: string) => {
  const style = await TravelStyle.findById(id);

  if (!style) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Travel Style not found"
    );
  }

  await TravelStyle.findByIdAndDelete(id);

  return null;
};

export const TravelStyleServices = {
  createTravelStyle,
  getAllTravelStyles,
  getSingleTravelStyle,
  updateTravelStyle,
  deleteTravelStyle,
};
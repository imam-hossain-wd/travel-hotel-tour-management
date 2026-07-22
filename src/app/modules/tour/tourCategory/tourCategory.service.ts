import httpStatus from "http-status-codes";
import { TourCategory } from "./tourCategory.model";
import AppError from "../../../errorHelpers/AppError";
import { QueryBuilder } from "../../../utils/QueryBuilder";
import { ITourCategory } from "./tourCategory.interface copy";
import { tourCategorySearchableFields } from "./tourCategory.constant";


const createTourCategory = async (payload: ITourCategory) => {
    const isExist = await TourCategory.findOne({
        $or: [
            { name: payload.name },
            { slug: payload.slug }
        ]
    });

    if (isExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Tour Category already exists"
        );
    }

    return await TourCategory.create(payload);
};

const getAllTourCategories = async (
    query: Record<string, string>
) => {

    const queryBuilder = new QueryBuilder(
        TourCategory.find(),
        query
    );

    const categories = queryBuilder
        .search(tourCategorySearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        categories.build(),
        queryBuilder.getMeta()
    ]);

    return {
        data,
        meta
    };
};

const getSingleTourCategory = async (id: string) => {

    const category = await TourCategory.findById(id);

    if (!category) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Tour Category not found"
        );
    }

    return {
        data: category
    };
};

const updateTourCategory = async (
    id: string,
    payload: Partial<ITourCategory>
) => {

    const category = await TourCategory.findById(id);

    if (!category) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Tour Category not found"
        );
    }

    return await TourCategory.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true
        }
    );
};

const deleteTourCategory = async (id: string) => {

    const category = await TourCategory.findById(id);

    if (!category) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Tour Category not found"
        );
    }

    await TourCategory.findByIdAndDelete(id);

    return null;
};

export const TourCategoryServices = {
    createTourCategory,
    getAllTourCategories,
    getSingleTourCategory,
    updateTourCategory,
    deleteTourCategory,
};
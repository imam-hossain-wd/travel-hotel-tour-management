import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { User } from "../user/user.model";
// import { Role } from "../user/user.interface";
import { Guide } from "./guide.model";
import { IGuide } from "./guide.interface";

const createGuide = async (payload: IGuide) => {
    const user = await User.findById(payload.user);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // if (user.role !== Role.GUIDE) {
    //     throw new AppError(
    //         httpStatus.BAD_REQUEST,
    //         "Selected user is not a guide"
    //     );
    // }

    const isGuideExist = await Guide.findOne({
        user: payload.user,
    });

    if (isGuideExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Guide profile already exists"
        );
    }

    const guide = await Guide.create(payload);

    return guide;
};

const updateGuide = async (
    id: string,
    payload: Partial<IGuide>
) => {

    const guide = await Guide.findById(id);

    if (!guide) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Guide not found"
        );
    }

    return await Guide.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true,
        }
    );
};

const deleteGuide = async (id: string) => {

    const guide = await Guide.findById(id);

    if (!guide) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Guide not found"
        );
    }

    await Guide.findByIdAndDelete(id);

    return null;
};

const getSingleGuide = async (id: string) => {

    const guide = await Guide.findById(id)
        .populate(
            "user",
            "name email phone picture"
        );

    return {
        data: guide,
    };
};

const getAllGuides = async (
    query: Record<string, string>
) => {

    const queryBuilder = new QueryBuilder(
        Guide.find().populate(
            "user",
            "name email phone picture"
        ),
        query
    );

    const guidesData = queryBuilder
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        guidesData.build(),
        queryBuilder.getMeta(),
    ]);

    return {
        data,
        meta,
    };
};

export const GuideServices = {
    createGuide,
    updateGuide,
    deleteGuide,
    getSingleGuide,
    getAllGuides,
};
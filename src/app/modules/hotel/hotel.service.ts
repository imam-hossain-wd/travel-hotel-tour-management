import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { hotelSearchableFields } from "./hotel.constant";
import { IHotel } from "./hotel.interface";
import { Hotel } from "./hotel.model";

/* ---------------- Create Hotel ---------------- */

const createHotel = async (payload: IHotel) => {
    const existingHotel = await Hotel.findOne({ name: payload.name });

    if (existingHotel) {
        throw new AppError(409, "Hotel already exists.");
    }

    const hotel = await Hotel.create(payload);

    return hotel;
};

/* ---------------- Get All Hotels ---------------- */

const getAllHotels = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(
        Hotel.find().populate("division"),
        query
    );

    const hotels = queryBuilder
        .search(hotelSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        hotels.build(),
        queryBuilder.getMeta(),
    ]);

    return {
        data,
        meta,
    };
};

/* ---------------- Get Single Hotel ---------------- */

const getSingleHotel = async (slug: string) => {

    const hotel = await Hotel.findOne({ slug }).populate("division");

    if (!hotel) {
        throw new AppError(404, "Hotel not found.");
    }

    return hotel;
};

/* ---------------- Update Hotel ---------------- */

const updateHotel = async (
    id: string,
    payload: Partial<IHotel & { deleteImages?: string[] }>
) => {

    const existingHotel = await Hotel.findById(id);

    if (!existingHotel) {
        throw new AppError(404, "Hotel not found.");
    }

    // Merge Images
    if (
        payload.images &&
        payload.images.length > 0 &&
        existingHotel.images &&
        existingHotel.images.length > 0
    ) {
        payload.images = [...existingHotel.images, ...payload.images];
    }

    // Delete Selected Images
    if (
        payload.deleteImages &&
        payload.deleteImages.length > 0 &&
        existingHotel.images
    ) {

        const remainingImages = existingHotel.images.filter(
            (image) => !payload.deleteImages?.includes(image)
        );

        const newImages = (payload.images || [])
            .filter((image) => !payload.deleteImages?.includes(image))
            .filter((image) => !remainingImages.includes(image));

        payload.images = [...remainingImages, ...newImages];
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true,
        }
    );

    if (
        payload.deleteImages &&
        payload.deleteImages.length > 0
    ) {
        await Promise.all(
            payload.deleteImages.map((url) =>
                deleteImageFromCLoudinary(url)
            )
        );
    }

    return updatedHotel;
};

/* ---------------- Delete Hotel ---------------- */

const deleteHotel = async (id: string) => {

    const existingHotel = await Hotel.findById(id);

    if (!existingHotel) {
        throw new AppError(404, "Hotel not found.");
    }

    if (existingHotel.thumbnail) {
        await deleteImageFromCLoudinary(existingHotel.thumbnail);
    }

    if (existingHotel.images?.length) {
        await Promise.all(
            existingHotel.images.map((url) =>
                deleteImageFromCLoudinary(url)
            )
        );
    }

    await Hotel.findByIdAndDelete(id);

    return null;
};

export const HotelService = {
    createHotel,
    getAllHotels,
    getSingleHotel,
    updateHotel,
    deleteHotel,
};
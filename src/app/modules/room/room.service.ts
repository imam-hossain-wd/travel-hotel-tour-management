import AppError from "../../errorHelpers/AppError";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { IRoom } from "./room.interface";
import { Room } from "./room.model";
import { roomSearchableFields } from "./room.constant";

const createRoom = async (payload: IRoom) => {

    const room = await Room.create(payload);

    return room;
};

const getAllRooms = async (
    query: Record<string, string>
) => {

    const queryBuilder = new QueryBuilder(

        Room.find()
            .populate("hotel"),

        query
    );

    const rooms = queryBuilder
        .search(roomSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        rooms.build(),
        queryBuilder.getMeta(),
    ]);

    return {
        data,
        meta,
    };
};

const getSingleRoom = async (id: string) => {

    const room = await Room.findById(id)
        .populate("hotel");

    if (!room) {
        throw new AppError(404, "Room not found");
    }

    return room;
};

const updateRoom = async (
    id: string,
    payload: Partial<IRoom & { deleteImages?: string[] }>
) => {

    const room = await Room.findById(id);

    if (!room) {
        throw new AppError(404, "Room not found");
    }

    let updatedImages = [...room.images];

    if (payload.deleteImages?.length) {

        updatedImages = updatedImages.filter(
            img => !payload.deleteImages?.includes(img.publicId)
        );

        await Promise.all(
            payload.deleteImages.map(id =>
                deleteImageFromCLoudinary(id)
            )
        );
    }

    if (payload.images?.length) {

        updatedImages.push(...payload.images);
    }

    payload.images = updatedImages;

    const updatedRoom = await Room.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true,
        }
    );

    return updatedRoom;
};

const deleteRoom = async (id: string) => {

    const room = await Room.findById(id);

    if (!room) {

        throw new AppError(404, "Room not found");
    }

    if (room.images.length) {

        await Promise.all(

            room.images.map(image =>
                deleteImageFromCLoudinary(image.publicId)
            )

        );
    }

    await Room.findByIdAndDelete(id);

    return null;
};

export const RoomService = {
    createRoom,
    getAllRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
};
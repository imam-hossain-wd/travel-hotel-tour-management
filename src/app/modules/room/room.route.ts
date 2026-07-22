import express from "express";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createRoomZodSchema, updateRoomZodSchema } from "./room.validation";
import { RoomController } from "./room.controller";


const router = express.Router();

router.post(
    "/create",
    multerUpload.array("files"),
    validateRequest(createRoomZodSchema),
    RoomController.createRoom
);

router.get(
    "/",
    RoomController.getAllRooms
);

router.get(
    "/:id",
    RoomController.getSingleRoom
);

router.patch(
    "/:id",
    multerUpload.array("files"),
    validateRequest(updateRoomZodSchema),
    RoomController.updateRoom
);

router.delete(
    "/:id",
    RoomController.deleteRoom
);

export const RoomRoutes = router;
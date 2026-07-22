import express from "express";
import { HotelController } from "./hotel.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createHotelZodSchema, updateHotelZodSchema } from "./hotel.validation";


const router = express.Router();

router.post(
    "/create",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.array("files"),
    validateRequest(createHotelZodSchema),
    HotelController.createHotel
);

router.get(
    "/",
    HotelController.getAllHotels
);

router.get(
    "/:id",
    HotelController.getSingleHotel
);

router.patch(
    "/:id",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.array("files"),
    validateRequest(updateHotelZodSchema),
    HotelController.updateHotel
);

router.delete(
    "/:id",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    HotelController.deleteHotel
);

export const HotelRoutes = router;


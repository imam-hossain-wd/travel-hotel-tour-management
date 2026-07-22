import { Router } from "express";
import { TravelStyleControllers } from "./travelStyle.controller";
import {
  createTravelStyleZodSchema,
  updateTravelStyleZodSchema,
} from "./travelStyle.validation";
// import { Role } from "../../user/user.interface";
// import { checkAuth } from "../../../middlewares/checkAuth";
import { validateRequest } from "../../../middlewares/validateRequest";

const router = Router();

router.post(
  "/",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTravelStyleZodSchema),
  TravelStyleControllers.createTravelStyle
);

router.get(
  "/",
  TravelStyleControllers.getAllTravelStyles
);

router.get(
  "/:id",
  TravelStyleControllers.getSingleTravelStyle
);

router.patch(
  "/:id",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTravelStyleZodSchema),
  TravelStyleControllers.updateTravelStyle
);

router.delete(
  "/:id",
//   checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  TravelStyleControllers.deleteTravelStyle
);

export const TravelStyleRoutes = router;
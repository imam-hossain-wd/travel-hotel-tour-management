import { Router } from "express";
import { Role } from "../../user/user.interface";
import { checkAuth } from "../../../middlewares/checkAuth";
import { TourCategoryControllers } from "./tourCategory.controller";


const router = Router();

router.post(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    TourCategoryControllers.createTourCategory
);

router.get(
    "/",
    TourCategoryControllers.getAllTourCategories
);

router.get(
    "/:id",
    TourCategoryControllers.getSingleTourCategory
);

router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    TourCategoryControllers.updateTourCategory
);

router.delete(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    TourCategoryControllers.deleteTourCategory
);

export const TourCategoryRoutes = router;
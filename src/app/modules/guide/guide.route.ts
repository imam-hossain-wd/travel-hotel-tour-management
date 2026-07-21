import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { GuideControllers } from "./guide.controller";

const router = Router();

router.post(
    "/create",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    GuideControllers.createGuide
);

router.get(
    "/",
    GuideControllers.getAllGuides
);

router.get(
    "/:id",
    GuideControllers.getSingleGuide
);

router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    GuideControllers.updateGuide
);

router.delete(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    GuideControllers.deleteGuide
);

export const GuideRoutes = router;
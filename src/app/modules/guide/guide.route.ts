import { Router } from "express";
import { GuideControllers } from "./guide.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
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
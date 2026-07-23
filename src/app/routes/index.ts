import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { AuthRoutes } from "../modules/auth/auth.route"
import { DivisionRoutes } from "../modules/division/division.route"
import { TourRoutes } from "../modules/tour/tour/tour.route"
import { GuideRoutes } from "../modules/guide/guide.route"
import { TourCategoryRoutes } from "../modules/tour/tourCategory/tourCategory.route"
import { TravelStyleRoutes } from "../modules/tour/TravelStyle/travelStyle.route"
import { HotelRoutes } from "../modules/hotel/hotel.route"
import { RoomRoutes } from "../modules/room/room.route"


export const router = Router()

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/division",
        route: DivisionRoutes
    },
    {
        path: "/tour",
        route: TourRoutes
    },
    {
        path: "/guide",
        route: GuideRoutes
    },
    {
        path: "/tour-category",
        route: TourCategoryRoutes
    },
    {
        path: "/travel-style",
        route: TravelStyleRoutes
    },
    {
        path: "/hotel",
        route: HotelRoutes
    },
    {
        path: "/room",
        route: RoomRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


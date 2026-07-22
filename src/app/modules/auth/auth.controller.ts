import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { AuthServices } from "./auth.service"
import { envVars } from "../../config/env"
import AppError from "../../errorHelpers/AppError"
import httpStatus from "http-status-codes";
const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.credentialsLogin(req.body)
    const { refreshToken, ...others } = result;
    const cookieOptions = {
        secure: envVars.NODE_ENV === 'production',
        httpOnly: true,
    };

    const verifyUser = others?.user?.isVerified;

    if(!verifyUser){
       throw new AppError(httpStatus.UNAUTHORIZED, "User is not verified")
    }
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "user logged in successfully",
        data: {
            accessToken: others?.accessToken,
            user: others?.user
        }
    })

})





export const AuthControllers = {
    credentialsLogin,
}
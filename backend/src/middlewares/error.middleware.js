import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
    if(res.headerSent) {
        return next(err);
    }

    const isOperational  = err instanceof AppError && err.isOperational;


    const statusCode = isOperational ? err.statusCode : 500;

    if(!isOperational) {
        console.log("Unexpected error: ", err);
    }

    return res.status(statusCode).json({
        success: false,
        message: isOperational ? err.message : "Internal server error"
    });
}
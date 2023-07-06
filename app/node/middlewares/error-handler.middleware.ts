import {NextFunction, Request,Response} from "express";

export default class ErrorHandlerMiddleware {
  static init(err:Error, req:Request, res:Response, next:NextFunction) {
    res.json({
      error: {
        message: err.message || 'Internal Server Error',
      },
    });
  }
}

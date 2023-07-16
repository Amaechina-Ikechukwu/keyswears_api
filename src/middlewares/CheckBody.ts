import { Request, Response, NextFunction, RequestHandler } from 'express';

// Middleware to check if userId and token are present in the request body
const checkRequestBodyWithParams = (param1: string, param2: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = req.body;

    if (!data.hasOwnProperty(param1) || !data.hasOwnProperty(param2)) {
      res.status(400).json({ error: `You are missing ${param1} or ${param2}` });
    }

    // Call next() only when both parameters are present to proceed to the next middleware/route handler.
    next();
  };
};

export default checkRequestBodyWithParams;

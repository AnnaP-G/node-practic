import { isHttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.data,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: err.message,
    data: err.data,
  });
};

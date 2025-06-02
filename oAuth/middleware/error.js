export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message =
    process.env.NODE_ENV === "production" ? "internal error" : err.message;
  errews.status(statusCode).json({
    success: false,
    error: message,
  });
};


export const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
}
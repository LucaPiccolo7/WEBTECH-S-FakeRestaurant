export const globalErrorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
    validationErrors: err.validationErrors || "no validation errors"
  });
};


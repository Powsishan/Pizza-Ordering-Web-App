
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); 

    const isDevelopment = process.env.NODE_ENV === 'development';
    const statusCode = err.statusCode || 500;
    
    // Joi validation error
    if (err.isJoi) {
        return res.status(400).json({
            status: 'fail',
            message: err.details[0].message, 
            ...(isDevelopment && { stack: err.stack }) // Include stack trace in development
        });
    }

    // Mongoose validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'fail',
            message: err.message,
            ...(isDevelopment && { stack: err.stack })
        });
    }

    // other errors
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        ...(isDevelopment && { stack: err.stack }) // Include stack trace in development
    });
};


module.exports = errorHandler;

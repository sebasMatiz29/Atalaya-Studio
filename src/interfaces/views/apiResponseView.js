export function sendSuccess(response, data, statusCode = 200) {
    response.status(statusCode).json({
        ok: true,
        data
    });
}

export function sendError(response, error) {
    const statusCode = error.statusCode || 500;

    response.status(statusCode).json({
        ok: false,
        message: error.message || 'Error interno del servidor.',
        details: error.details || null
    });
}

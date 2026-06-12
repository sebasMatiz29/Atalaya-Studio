import { sendError } from '../../../interfaces/views/apiResponseView.js';

export function errorHandler(error, request, response, next) {
    console.error(error);
    sendError(response, error);
}

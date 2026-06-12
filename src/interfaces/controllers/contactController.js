import { sendSuccess } from '../views/apiResponseView.js';

export function createContactController({ contactService }) {
    return {
        async create(request, response, next) {
            try {
                const result = await contactService.sendContactMessage(request.body);
                sendSuccess(response, result, 201);
            } catch (error) {
                next(error);
            }
        }
    };
}

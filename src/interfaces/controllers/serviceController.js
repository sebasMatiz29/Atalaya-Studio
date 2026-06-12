import { sendSuccess } from '../views/apiResponseView.js';

export function createServiceController({ serviceService }) {
    return {
        async list(request, response, next) {
            try {
                const services = await serviceService.listServices();
                sendSuccess(response, services);
            } catch (error) {
                next(error);
            }
        }
    };
}

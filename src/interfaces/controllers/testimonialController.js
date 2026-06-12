import { sendSuccess } from '../views/apiResponseView.js';

export function createTestimonialController({ testimonialService }) {
    return {
        async list(request, response, next) {
            try {
                const testimonials = await testimonialService.listTestimonials();
                sendSuccess(response, testimonials);
            } catch (error) {
                next(error);
            }
        }
    };
}

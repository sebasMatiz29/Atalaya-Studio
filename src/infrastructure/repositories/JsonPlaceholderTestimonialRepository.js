import { createTestimonial } from '../../domain/models/Testimonial.js';

const TESTIMONIALS_URL = 'https://jsonplaceholder.typicode.com/users';

export function createJsonPlaceholderTestimonialRepository() {
    return {
        async findAll() {
            const response = await fetch(TESTIMONIALS_URL);

            if (!response.ok) {
                const error = new Error(`No fue posible obtener testimonios. Estado: ${response.status}`);
                error.statusCode = 502;
                throw error;
            }

            const users = await response.json();

            return users.slice(0, 3).map(createTestimonial);
        }
    };
}

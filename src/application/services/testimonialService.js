export function createTestimonialService({ testimonialRepository }) {
    return {
        async listTestimonials() {
            return testimonialRepository.findAll();
        }
    };
}

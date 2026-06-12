export function createServiceService({ serviceRepository }) {
    return {
        async listServices() {
            return serviceRepository.findAll();
        }
    };
}

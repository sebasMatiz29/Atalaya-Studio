import { Router } from 'express';
import { createContactService } from '../../../application/services/contactService.js';
import { createServiceService } from '../../../application/services/serviceService.js';
import { createTestimonialService } from '../../../application/services/testimonialService.js';
import { createFileContactRepository } from '../../repositories/FileContactRepository.js';
import { createJsonPlaceholderTestimonialRepository } from '../../repositories/JsonPlaceholderTestimonialRepository.js';
import { createJsonServiceRepository } from '../../repositories/JsonServiceRepository.js';
import { createContactController } from '../../../interfaces/controllers/contactController.js';
import { createServiceController } from '../../../interfaces/controllers/serviceController.js';
import { createTestimonialController } from '../../../interfaces/controllers/testimonialController.js';
import { requireApiToken } from '../middleware/authToken.js';

export function createApiRoutes() {
    const router = Router();

    const serviceController = createServiceController({
        serviceService: createServiceService({
            serviceRepository: createJsonServiceRepository()
        })
    });

    const testimonialController = createTestimonialController({
        testimonialService: createTestimonialService({
            testimonialRepository: createJsonPlaceholderTestimonialRepository()
        })
    });

    const contactController = createContactController({
        contactService: createContactService({
            contactRepository: createFileContactRepository()
        })
    });

    router.get('/servicios', serviceController.list);
    router.get('/testimonios', testimonialController.list);
    router.post('/contacto', requireApiToken, contactController.create);

    return router;
}

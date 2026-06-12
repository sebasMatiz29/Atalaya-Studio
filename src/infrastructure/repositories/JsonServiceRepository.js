import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createService } from '../../domain/models/Service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SERVICES_PATH = resolve(__dirname, '../../../data/services.json');

export function createJsonServiceRepository() {
    return {
        async findAll() {
            const file = await readFile(SERVICES_PATH, 'utf8');
            const services = JSON.parse(file);

            return services.map(createService);
        }
    };
}

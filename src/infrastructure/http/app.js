import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApiRoutes } from './routes/apiRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, '../../../');

export function createApp() {
    const app = express();

    app.use(express.json({ limit: '25kb' }));
    app.use(express.urlencoded({ extended: false }));
    app.use(appCors);
    app.use(express.static(PROJECT_ROOT));
    app.use('/api', createApiRoutes());
    app.use(errorHandler);

    return app;
}

function appCors(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (request.method === 'OPTIONS') {
        response.sendStatus(204);
        return;
    }

    next();
}

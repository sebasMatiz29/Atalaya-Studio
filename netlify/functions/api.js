import serverless from 'serverless-http';
import { createApp } from '../../src/infrastructure/http/app.js';

const app = createApp();

export const handler = serverless(app);

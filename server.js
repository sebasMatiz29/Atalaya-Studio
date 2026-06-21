import { createApp } from './src/infrastructure/http/app.js';

const PORT = process.env.PORT || 3001;
const app = createApp();

app.listen(PORT, () => {
    console.log(`Atalaya Studio disponible en http://localhost:${PORT}`);
});

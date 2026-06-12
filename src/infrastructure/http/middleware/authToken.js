const DEFAULT_TOKEN = 'atalaya_public_demo_token';

export function requireApiToken(request, response, next) {
    const configuredToken = process.env.PUBLIC_API_TOKEN || DEFAULT_TOKEN;
    const header = request.get('authorization') || '';
    const token = header.replace('Bearer ', '').trim();

    if (token !== configuredToken) {
        response.status(401).json({
            ok: false,
            message: 'Token de autorización inválido o ausente.'
        });
        return;
    }

    next();
}

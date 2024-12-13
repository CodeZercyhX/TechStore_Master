// Controlador para la autenticación de usuarios
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Credenciales estáticas (en una aplicación real se usa una base de datos o un servicio de autenticación)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin',
    };

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        res.status(200).json({ message: 'Autenticación exitosa', user: { username, role: 'admin' } });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
};

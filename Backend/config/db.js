const mongoose = require('mongoose');

const connectDB = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true, // Opcional para versiones modernas
        useUnifiedTopology: true, // Opcional para versiones modernas
    });
    console.log('Conexión a MongoDB local exitosa');
    } catch (err) {
    console.error('Error al conectar a MongoDB:', err.message);
    process.exit(1);
    }
};

module.exports = connectDB;

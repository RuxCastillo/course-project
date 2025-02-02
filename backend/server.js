// server/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import env from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from './client.js';

env.config();

// Obtener la ruta del archivo actual (equivalente a __dirname en módulos)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos de la carpeta "dist"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/dist')));

const db = new pg.Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.POSTGRES_PORT,
	connectionTimeoutMillis: 20000,
	idleTimeoutMillis: 30000,
	max: 10,
	ssl: {
		rejectUnauthorized: false,
	},
});

db.connect().catch((err) =>
	console.error('Error de node a la base de datos', err)
);
// Ruta para el backend
app.get('/api', (req, res) => {
	res.json({ message: 'Hello from Express!' });
});

// Ruta para manejar todas las peticiones y servir la SPA (single-page application)
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

async function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

export async function checkBlocked(req, res, next) {
	const userId = req.user.id;
	console.log(userId, 'userId');

	try {
		const userResult = await db.query('SELECT * FROM task4 WHERE id = $1', [
			userId,
		]);
		const dbUser = userResult.rows[0];
		console.log(dbUser, 'dbUser');

		if (!dbUser || dbUser.blocked) {
			return res.sendStatus(403);
		}

		next();
	} catch (err) {
		console.error('Error checking user blocked status:', err);
		res
			.status(500)
			.json({ message: 'Error checking user blocked status', error: err });
	}
}
export async function checkBlockedEmail(req, res, next) {
	const userId = req.body.email;
	console.log(userId, 'userId');

	try {
		const userResult = await db.query('SELECT * FROM task4 WHERE email = $1', [
			userId,
		]);
		const dbUser = userResult.rows[0];
		console.log(dbUser, 'dbUser');

		if (!dbUser || dbUser.blocked) {
			return res.sendStatus(403);
		}

		next();
	} catch (err) {
		console.error('Error checking user blocked status:', err);
		res
			.status(500)
			.json({ message: 'Error checking user blocked status', error: err });
	}
}

// Arrancar el servidor
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;

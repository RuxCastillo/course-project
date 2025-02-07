import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Ruta para validar el token
router.post('/api/auth/validateToken', (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		res.json({ valid: true, userId: decoded.id });
	} catch (error) {
		console.error('Error validating token:', error);
		res.status(401).json({ error: 'Invalid token' });
	}
});

export default router;

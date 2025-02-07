import express from 'express';
import prisma from '../client.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Ruta para actualizar la imagen de perfil del usuario
router.post('/api/user/updateProfileImage', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;
		const { imageUrl } = req.body;

		const user = await prisma.user.update({
			where: { id: userId },
			data: { profileImage: imageUrl },
		});

		res.json(user);
	} catch (error) {
		console.error('Error updating profile image:', error);
		res.status(500).json({ error: 'Failed to update profile image' });
	}
});

export default router;

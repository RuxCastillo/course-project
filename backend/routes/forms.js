import express from 'express';
import prisma from '../client.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/forms', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;
		const { template_id, answers } = req.body;

		const newForm = await prisma.form.create({
			data: {
				template_id,
				user_id: userId,
				answers: {
					create: answers.map((answer) => ({
						question_id: answer.question_id,
						answer_text: answer.answer_text,
						answer_number: answer.answer_number,
						answer_checkbox: answer.answer_checkbox,
					})),
				},
			},
		});

		res.status(201).json(newForm);
	} catch (error) {
		console.error('Error creating form:', error);
		res.status(500).json({ error: 'Failed to create form' });
	}
});

export default router;

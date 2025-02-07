import express from 'express';
import prisma from '../client.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/templates', async (req, res) => {
	const { title, description, tags, is_public, questions, topic, image_url } =
		req.body;
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const userId = decoded.id;

		const newTemplate = await prisma.template.create({
			data: {
				title: title,
				description,
				is_public,
				topic,
				image_url,
				creator: {
					connect: { id: userId },
				},
				templateTags: {
					create: tags.map((tag) => ({
						tag: {
							connectOrCreate: {
								where: { name: tag },
								create: { name: tag },
							},
						},
					})),
				},
				questions: {
					create: questions.map((question) => ({
						title: question.question,
						question_type: question.type,
						order: question.order,
						options: {
							set: question.checkbox || [],
						},
					})),
				},
			},
		});

		res.status(201).json(newTemplate);
	} catch (error) {
		console.error('Error creating template:', error);
		res.status(500).json({ error: 'Failed to create template' });
	}
});

export default router;

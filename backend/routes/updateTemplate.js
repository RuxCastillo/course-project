import express from 'express';
import prisma from '../client.js';

const router = express.Router();

router.put('/api/templates/:id', async (req, res) => {
	const { id } = req.params;
	const {
		title,
		description,
		tags,
		is_public,
		questions,
		allowedUsers,
		topic,
		create,
		image_url,
	} = req.body;

	const sanitizedQuestions = questions.map(
		({ id, template_id, ...rest }) => rest
	);

	try {
		const updatedTemplate = await prisma.template.update({
			where: { id: parseInt(id) },
			data: {
				title,
				description,
				is_public,
				topic,
				image_url,
				templateTags: {
					deleteMany: {},
					create: tags.map((tag) => ({
						tag: {
							connectOrCreate: {
								where: { name: tag },
								create: { name: tag },
							},
						},
					})),
				},
				allowedUsers: {
					set: allowedUsers.map((user) => ({ id: user.id })),
				},
			},
		});

		for (const question of questions) {
			const { id, ...questionData } = question;
			if (id) {
				// Verificar si la pregunta existe antes de actualizarla
				const existingQuestion = await prisma.question.findUnique({
					where: { id },
				});
				if (existingQuestion) {
					await prisma.question.update({
						where: { id },
						data: {
							title: questionData.question,
							question_type: questionData.type,
							order: questionData.order,
							options: {
								set: questionData.checkbox || [],
							},
						},
					});
				} else {
					// Crear una nueva pregunta si no existe
					await prisma.question.create({
						data: {
							title: questionData.question,
							question_type: questionData.type,
							order: questionData.order,
							options: {
								set: questionData.checkbox || [],
							},
							template: { connect: { id: parseInt(id) } },
						},
					});
				}
			} else {
				// Crear una nueva pregunta si no tiene id
				await prisma.question.create({
					data: {
						title: questionData.question,
						question_type: questionData.type,
						order: questionData.order,
						options: {
							set: questionData.checkbox || [],
						},
						template: { connect: { id: parseInt(id) } },
					},
				});
			}
		}

		res.json(updatedTemplate);
	} catch (error) {
		console.error('Error updating template: ', error);
		res.status(500).json({ error: 'Failed to update template' });
	}
});

export default router;

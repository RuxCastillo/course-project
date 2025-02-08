import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnswerNumber from './AnswerNumber';
import AnswerSingle from './AnswerSingle';
import AnswerCheckbox from './AnswerCheckbox';
import AnswerMultiple from './AnswerMultiple';
import NavBar from '../NavBar';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}

export default function form() {
	const { id } = useParams();
	const [template, setTemplate] = useState(null);
	const [form, setForm] = useState({});

	useEffect(() => {
		async function fetchTemplate() {
			try {
				const response = await fetch(`${API_URL}/api/searchtemplates/${id}`);
				if (!response.ok) {
					throw new Error('Failed to fetch template');
				}
				const data = await response.json();
				setTemplate(data);
			} catch (error) {
				console.error('Error fetching template:', error);
			}
		}

		fetchTemplate();
	}, [id]);

	if (!template) {
		return <div>Loading...</div>;
	}

	console.log(template);

	function sortQuestions(questions) {
		return questions.sort((a, b) => a.order - b.order);
	}

	const sortedQuestions = sortQuestions(template.questions);
	console.log(sortedQuestions);

	async function handleSubmit(event) {
		event.preventDefault();
		const token = localStorage.getItem('token');
		const answers = sortedQuestions.map((question) => {
			const answer = form[question.id] || {};
			return {
				question_id: question.id,
				answer_text: answer.answer_text || null,
				answer_number: +answer.answer_number || null,
				answer_checkbox: answer.answer_checkbox || [],
			};
		});

		try {
			const response = await fetch(`${API_URL}/api/forms`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ template_id: +id, answers }),
			});
			if (response.ok) {
				console.log('Form submitted successfully');
			} else {
				console.error('Failed to submit form');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}

	const handleChange = (questionId, value) => {
		setForm((prevForm) => ({
			...prevForm,
			[questionId]: {
				...prevForm[questionId],
				...value,
			},
		}));
	};

	return (
		<>
			<NavBar />
			<main className="form">
				<section className="form__section">
					<div className="form__description">
						<div className="form__description--divimg">
							<img
								src={template.image_url}
								alt=""
								className="form__description--img"
							/>
						</div>
						<div className="form__description--div">
							<h1 className="form__description--h1">{template.title}</h1>
							<p className="form__description--p1">{template.topic}</p>
							<p className="form__description--p2">{template.description}</p>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						{sortedQuestions.map((question) => {
							if (question.question_type === 'number') {
								return (
									<AnswerNumber
										key={question.id}
										question={question}
										handleChange={(value) =>
											handleChange(question.id, { answer_number: value })
										}
									/>
								);
							} else if (question.question_type === 'single') {
								return (
									<AnswerSingle
										key={question.id}
										question={question}
										handleChange={(value) =>
											handleChange(question.id, { answer_text: value })
										}
									/>
								);
							} else if (question.question_type === 'multiple') {
								return (
									<AnswerMultiple
										key={question.id}
										question={question}
										handleChange={(value) =>
											handleChange(question.id, { answer_text: value })
										}
									/>
								);
							} else {
								return (
									<AnswerCheckbox
										key={question.id}
										question={question}
										handleChange={(value) =>
											handleChange(question.id, { answer_checkbox: value })
										}
									/>
								);
							}
						})}
						<button type="submit">Enviar formulario</button>
					</form>
				</section>
			</main>
		</>
	);
}

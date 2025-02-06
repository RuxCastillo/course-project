import { useState } from 'react';
import General from './sectionsTemplate/General';
import Questions from './sectionsTemplate/Questions';
import Results from './sectionsTemplate/Results';
import Aggregation from './sectionsTemplate/Aggregation';
import NavBar from './NavBar';
import { handleSignOut } from './Utilities';
let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

export default function CreateTemplate() {
	const [section, setSection] = useState('general');
	const [tag, setTag] = useState('');
	const [checkboxRestricted, setCheckboxRestricted] = useState(false);
	const [template, setTemplate] = useState({
		title: '',
		description: '',
		tags: [],
		is_public: true,
		questions: [],
		results: [],
		aggregation: '',
		topic: 'string de topic',
		create: true,
	});

	function handleSection(section) {
		setSection(section);
	}

	function handleTitle(event) {
		setTemplate({ ...template, title: event.target.value });
		console.log(template);
	}

	function handleDescription(event) {
		setTemplate({ ...template, description: event.target.value });
	}

	function addTag() {
		setTemplate({ ...template, tags: [...template.tags, tag] });
		setTag('');
	}

	function removeTag(tagIdx) {
		const updatedTags = [...template.tags];
		updatedTags.splice(tagIdx, 1);
		console.log(updatedTags);
		setTemplate({ ...template, tags: updatedTags });
	}

	function handleTagInput(event) {
		setTag(event.target.value);
	}

	function addQuestion() {
		const question = {
			id: Math.floor(Math.random() * 1000000),
			question: '',
			type: 'single',
			checkbox: [],
			order: orderFunc(),
		};
		setTemplate({
			...template,
			questions: [...template.questions, question],
		});
		console.log(template.questions);
	}

	function orderFunc() {
		const order = template.questions.length;
		return order;
	}

	function changeTypeQuestion(str, idx) {
		const updatedQuestions = [...template.questions];
		updatedQuestions[idx].type = str;
		setTemplate({ ...template, questions: updatedQuestions });
	}

	function changeQuestionText(str, idx) {
		const updatedQuestions = [...template.questions];
		updatedQuestions[idx].question = str;
		setTemplate({ ...template, questions: updatedQuestions });
		console.log(template.questions);
	}

	function addCheckboxInQuestion(str, idx) {
		const updatedQuestions = [...template.questions];
		updatedQuestions[idx].checkbox.push(str);
		setTemplate({ ...template, questions: updatedQuestions });
	}

	function removeCheckboxInQuestion(checkboxIdx, questionIdx) {
		const updatedQuestions = [...template.questions];
		updatedQuestions[questionIdx].checkbox.splice(checkboxIdx, 1);
		setTemplate({ ...template, questions: updatedQuestions });
	}

	function onClickCheckboxRestricted() {
		setCheckboxRestricted((prevState) => !prevState);
	}

	async function handleSubmit() {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`${API_URL}/api/templates`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(template),
			});
			if (response.ok) {
				console.log('Template saved successfully');
			} else {
				console.error('Failed to save template');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
	function handleSignOut() {
		dispatch({ type: 'LOGOUT' });
		navigate('/');
		console.log(localStorage);
	}

	return (
		<>
			<NavBar />
			<main className="template">
				<aside className="template__navbar">
					<div
						onClick={() => handleSection('general')}
						className="template__navbar--div"
					>
						General
					</div>
					<div
						onClick={() => handleSection('questions')}
						className="template__navbar--div"
					>
						Questions
					</div>
					<div
						onClick={() => handleSection('results')}
						className="template__navbar--div"
					>
						Results
					</div>
					<div
						onClick={() => handleSection('aggregation')}
						className="template__navbar--div"
					>
						Aggregation of results
					</div>
				</aside>
				{section === 'general' && (
					<General
						handleTitle={handleTitle}
						handleDescription={handleDescription}
						addTag={addTag}
						handleTagInput={handleTagInput}
						tag={tag}
						tags={template.tags}
						removeTag={removeTag}
						checkboxRestricted={checkboxRestricted}
						onClickCheckboxRestricted={onClickCheckboxRestricted}
					/>
				)}
				{section === 'questions' && (
					<Questions
						addQuestion={addQuestion}
						questions={template.questions}
						changeTypeQuestion={changeTypeQuestion}
						changeQuestionText={changeQuestionText}
						addCheckboxInQuestion={addCheckboxInQuestion}
						removeCheckboxInQuestion={removeCheckboxInQuestion}
					/>
				)}
				{section === 'results' && <Results />}
				{section === 'aggregation' && <Aggregation />}
				<button onClick={handleSubmit} className="template__button">
					Save Template
				</button>
			</main>
		</>
	);
}

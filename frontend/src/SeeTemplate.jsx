import { useState, useEffect } from 'react';
import General from './sectionsTemplate/General';
import Questions from './sectionsTemplate/Questions';
import Results from './sectionsTemplate/Results';
import Aggregation from './sectionsTemplate/Aggregation';
import NavBar from './NavBar';
import { handleSignOut } from './Utilities';
import { useGlobalState } from './store/GlobalState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useParams } from 'react-router-dom';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}
console.log(API_URL);

export default function CreateTemplate() {
	const { id } = useParams();
	const [section, setSection] = useState('general');
	const { state, dispatch } = useGlobalState();
	const [tag, setTag] = useState('');
	const { t } = useTranslation();
	const [checkboxRestricted, setCheckboxRestricted] = useState(false);
	const [template, setTemplate] = useState({
		title: '',
		description: '',
		tags: [],
		is_public: true,
		questions: [],
		results: [],
		allowedUsers: [],
		aggregation: '',
		topic: 'string de topic',
		create: true,
		image_url: '',
	});

	useEffect(() => {
		async function fetchTemplate() {
			try {
				const response = await fetch(`${API_URL}/api/fetchTemplate/${id}`);
				if (!response.ok) {
					throw new Error('Failed to fetch template');
				}
				const data = await response.json();
				setTemplate((prevState) => {
					return {
						...prevState,
						...data,
					};
				});
				console.log(template);
			} catch (error) {
				console.error('Error fetching template', error);
			}
		}

		fetchTemplate();
	}, [id]);

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

	function addAllowedUser(user) {
		if (user && !template.allowedUsers.includes(user)) {
			setTemplate({
				...template,
				allowedUsers: [...template.allowedUsers, user],
			});
		}
	}

	function deleteAllowedUser(user) {
		const updatedAllowedUsers = template.allowedUsers.filter(
			(allowedUser) => allowedUser !== user
		);
		setTemplate({ ...template, allowedUsers: updatedAllowedUsers });
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

	const handleImageUpload = async (imageUrl) => {
		setTemplate({ ...template, image_url: imageUrl });
	};

	useEffect(() => {
		if (state.user && state.user.language) {
			i18n.changeLanguage(state.user.language);
		}
	}, [state.user]);

	return (
		<>
			<NavBar />
			<main className="template">
				<aside className="template__navbar">
					<div
						onClick={() => handleSection('general')}
						className="template__navbar--div"
					>
						{t('general')}
					</div>
					<div
						onClick={() => handleSection('questions')}
						className="template__navbar--div"
					>
						{t('questions')}
					</div>
					<div
						onClick={() => handleSection('results')}
						className="template__navbar--div"
					>
						{t('results')}
					</div>
					<div
						onClick={() => handleSection('aggregation')}
						className="template__navbar--div"
					>
						{t('aggregation')}
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
						addAllowedUser={addAllowedUser}
						deleteAllowedUser={deleteAllowedUser}
						allowedUsers={template.allowedUsers}
						handleImageUpload={handleImageUpload}
						template={template}
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
						template={template}
					/>
				)}
				{section === 'results' && <Results template={template} />}
				{section === 'aggregation' && <Aggregation template={template} />}
				<button onClick={handleSubmit} className="template__button">
					{t('save_template')}
				</button>
			</main>
		</>
	);
}

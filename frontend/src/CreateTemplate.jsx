import { useState } from 'react';
import General from './sectionsTemplate/General';
import Questions from './sectionsTemplate/Questions';
import Results from './sectionsTemplate/Results';
import Aggregation from './sectionsTemplate/Aggregation';

export default function CreateTemplate() {
	const [section, setSection] = useState('general');
	const [tag, setTag] = useState('');
	const [template, setTemplate] = useState({
		title: '',
		description: '',
		tags: [],
		restricted: false,
		questions: {},
		results: [],
		aggregation: '',
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

	function handleTagInput(event) {
		setTag(event.target.value);
	}

	function addQuestion() {
		const question = {
			question: '',
			type: '',
		};
		setTemplate({ ...template, questions: [...template.questions, question] });
	}

	return (
		<main>
			<aside>
				<div onClick={() => handleSection('general')}>General</div>
				<div onClick={() => handleSection('questions')}>Questions</div>
				<div onClick={() => handleSection('results')}>results</div>
				<div onClick={() => handleSection('aggregation')}>
					aggregation of results
				</div>
			</aside>
			{section === 'general' && (
				<General
					handleTitle={handleTitle}
					handleDescription={handleDescription}
					addTag={addTag}
					handleTagInput={handleTagInput}
					tag={tag}
				/>
			)}
			{section === 'questions' && (
				<Questions addQuestion={addQuestion} questions={questions} />
			)}
			{section === 'results' && <Results />}
			{section === 'aggregation' && <Aggregation />}
		</main>
	);
}

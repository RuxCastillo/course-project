import { useState } from 'react';

export default function CheckboxQuestion({
	changeTypeQuestion,
	question,
	changeQuestionText,
	indice,
	addCheckboxInQuestion,
	removeCheckboxInQuestion,
}) {
	const [newCheckbox, setNewCheckbox] = useState('');

	const handleAddCheckbox = () => {
		addCheckboxInQuestion(newCheckbox, indice);
		setNewCheckbox('');
	};
	return (
		<div>
			<select
				onChange={(e) => changeTypeQuestion(e.target.value, indice)}
				value={question.type}
			>
				type
				<option value="single">Single</option>
				<option value="multiple">Multiple</option>
				<option value="number">Number</option>
				<option value="checkbox" selected>
					Checkbox
				</option>
			</select>
			<h2>Checkbox Question</h2>
			<input
				type="text"
				value={question.question}
				onChange={(e) => changeQuestionText(e.target.value, indice)}
			/>
			<input
				type="text"
				value={newCheckbox}
				onChange={(e) => setNewCheckbox(e.target.value)}
				placeholder="New checkbox option"
			/>
			<button onClick={handleAddCheckbox}>Add checkbox</button>
			{console.log(question)}
			{question.checkbox.map((checkbox, idx) => {
				return (
					<div key={idx}>
						<input type="text" value={checkbox} readOnly />
						<button onClick={() => removeCheckboxInQuestion(idx, indice)}>
							Delete
						</button>
					</div>
				);
			})}
		</div>
	);
}

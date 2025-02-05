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
		<div className="question">
			<p className="question__p">Checkbox Question</p>
			<input
				type="text"
				value={question.question}
				onChange={(e) => changeQuestionText(e.target.value, indice)}
				className="question__input"
			/>
			<input
				type="text"
				value={newCheckbox}
				onChange={(e) => setNewCheckbox(e.target.value)}
				placeholder="New checkbox option"
				className="question__input--checkbox"
			/>
			<p className="question__type">Type of answer:</p>
			<select
				onChange={(e) => changeTypeQuestion(e.target.value, indice)}
				value={question.type}
				className="question__select"
			>
				<option value="single">Single</option>
				<option value="multiple">Multiple</option>
				<option value="number">Number</option>
				<option value="checkbox" selected>
					Checkbox
				</option>
			</select>
			<button onClick={handleAddCheckbox} className="question__button">
				Add option
			</button>
			{question.checkbox.length > 0 && (
				<p className="question__p">
					These will be the answers in checkbox format:
				</p>
			)}
			{console.log(question)}
			<div className="question__checkbox">
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
		</div>
	);
}

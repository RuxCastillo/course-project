import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CheckboxQuestion({
	changeTypeQuestion,
	question,
	changeQuestionText,
	indice,
	addCheckboxInQuestion,
	removeCheckboxInQuestion,
}) {
	const [newCheckbox, setNewCheckbox] = useState('');
	const { t } = useTranslation();

	const handleAddCheckbox = () => {
		addCheckboxInQuestion(newCheckbox, indice);
		setNewCheckbox('');
	};
	return (
		<div className="question">
			<p className="question__p">{t('checkboxQuestion_title')}</p>
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
			<p className="question__type">{t('type_of_answer')}</p>
			<select
				onChange={(e) => changeTypeQuestion(e.target.value, indice)}
				value={question.type}
				className="question__select"
			>
				<option value="single">{t('single')}</option>
				<option value="multiple">{t('multiple')}</option>
				<option value="number">{t('number')}</option>
				<option value="checkbox" selected>
					{t('checkbox')}
				</option>
			</select>
			<button onClick={handleAddCheckbox} className="question__button">
				{t('add_option')}
			</button>
			{question.checkbox.length > 0 && (
				<p className="question__p">{t('answers_checkbox')}</p>
			)}
			{console.log(question)}
			<div className="question__checkbox">
				{question.checkbox.map((checkbox, idx) => {
					return (
						<div key={idx}>
							<input type="text" value={checkbox} readOnly />
							<button onClick={() => removeCheckboxInQuestion(idx, indice)}>
								{t('delete')}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

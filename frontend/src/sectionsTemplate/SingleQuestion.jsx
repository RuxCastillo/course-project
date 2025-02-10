import { useTranslation } from 'react-i18next';
export default function SingleQuestion({
	changeTypeQuestion,
	changeQuestionText,
	question,
	indice,
}) {
	const { t } = useTranslation();
	return (
		<div className="question">
			<p className="question__p">{t('question')}</p>
			<input
				type="text"
				id="single"
				value={question.question}
				onChange={(e) => changeQuestionText(e.target.value, indice)}
				className="question__input"
			/>
			<p className="question__type-answer">{t('type_of_answer')}</p>
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
		</div>
	);
}

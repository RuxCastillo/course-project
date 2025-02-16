import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';
import NumberQuestion from './NumberQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import { useTranslation } from 'react-i18next';

export default function Questions({
	questions,
	addQuestion,
	changeTypeQuestion,
	changeQuestionText,
	addCheckboxInQuestion,
	removeCheckboxInQuestion,
	template,
}) {
	const { t } = useTranslation();
	console.log(template);
	return (
		<section className="questions">
			{questions.map((question, idx) => {
				switch (question.type) {
					case 'checkbox':
						return (
							<CheckboxQuestion
								key={idx}
								question={question}
								changeTypeQuestion={changeTypeQuestion}
								changeQuestionText={changeQuestionText}
								indice={idx}
								addCheckboxInQuestion={addCheckboxInQuestion}
								removeCheckboxInQuestion={removeCheckboxInQuestion}
							/>
						);
					/* 					case 'multiple':
						return (
							<MultipleQuestion
								key={idx}
								question={question}
								changeTypeQuestion={changeTypeQuestion}
								changeQuestionText={changeQuestionText}
								indice={idx}
							/>
						);
					case 'number':
						return (
							<NumberQuestion
								key={idx}
								question={question}
								changeTypeQuestion={changeTypeQuestion}
								changeQuestionText={changeQuestionText}
								indice={idx}
							/>
						); */
					default:
						return (
							<SingleQuestion
								key={idx}
								question={question}
								changeTypeQuestion={changeTypeQuestion}
								changeQuestionText={changeQuestionText}
								indice={idx}
							/>
						);
				}
			})}
			<div className="questions__div">
				<button onClick={addQuestion} className="questions__button">
					{t('add_question')}
				</button>
			</div>
		</section>
	);
}

import SingleQuestion from './SingleQuestion';
import MultipleQuestion from './MultipleQuestion';
import NumberQuestion from './NumberQuestion';
import CheckboxQuestion from './CheckboxQuestion';

export default function Questions({
	questions,
	addQuestion,
	changeTypeQuestion,
	changeQuestionText,
	addCheckboxInQuestion,
	removeCheckboxInQuestion,
}) {
	return (
		<section>
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
					case 'multiple':
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
						);
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
			<button onClick={addQuestion}>Add Question</button>
		</section>
	);
}

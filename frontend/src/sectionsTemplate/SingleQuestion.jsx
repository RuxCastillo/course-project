export default function SingleQuestion({
	changeTypeQuestion,
	changeQuestionText,
	question,
	indice,
}) {
	return (
		<div className="question">
			<p className="question__p">Question:</p>
			<input
				type="text"
				id="single"
				value={question.question}
				onChange={(e) => changeQuestionText(e.target.value, indice)}
				className="question__input"
			/>
			<p className="question__type-answer">Type of answer</p>
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
		</div>
	);
}

export default function NumberQuestion({
	changeTypeQuestion,
	changeQuestionText,
	question,
	indice,
}) {
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
			<h2>Number Question</h2>
			<input
				type="text"
				value={question.question}
				onChange={(e) => changeQuestionText(e.target.value, indice)}
			/>
		</div>
	);
}

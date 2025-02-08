export default function AnswerNumber({ question, handleChange }) {
	return (
		<div className="answer">
			<p>{question.title}</p>
			<input
				type="number"
				min="0"
				className="answer__input"
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
}

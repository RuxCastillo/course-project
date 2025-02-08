export default function AnswerSingle({ question, handleChange }) {
	return (
		<div className="answer">
			<p>{question.title}</p>
			<input
				type="text"
				className="answer__input"
				onChange={(e) => handleChange(e.target.value)}
			/>
		</div>
	);
}

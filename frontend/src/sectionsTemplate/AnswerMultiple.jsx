export default function AnswerNumber({ question, handleChange }) {
	return (
		<div className="answer">
			<label>{question.title}</label>
			<textarea
				name=""
				id=""
				className="answer__input"
				onChange={(e) => handleChange(e.target.value)}
			></textarea>
		</div>
	);
}

export default function Questions({ questions, addQuestion }) {
	return (
		<section>
			{questions.map((question) => {
				switch (question.type) {
					case 'single':
						return <SingleQuestion key={question.id} question={question} />;
					case 'multiple':
						return <MultipleQuestion key={question.id} question={question} />;
					case 'number':
						return <NumberQuestion key={question.id} question={question} />;
					default:
						return <CheckboxQuestion key={question.id} question={question} />;
				}
			})}
			<button>Add Question</button>
		</section>
	);
}

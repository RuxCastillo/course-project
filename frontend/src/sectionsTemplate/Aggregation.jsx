import NoResults from './NoResults';

export default function Aggregation({ template }) {
	console.log(template);
	if (template.results.length === 0) {
		return <NoResults />;
	}

	return (
		<section className="aggregation__section">
			{template.questions.map((question, index) => {
				return (
					<div className="aggregation" key={index}>
						{question.question_type}
					</div>
				);
			})}
		</section>
	);
}

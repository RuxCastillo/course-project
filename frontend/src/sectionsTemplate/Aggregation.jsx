import NoResults from './NoResults';

export default function Aggregation({ template }) {
	if (template.results.length === 0) {
		return <NoResults />;
	}
	return <section>aggregation</section>;
}

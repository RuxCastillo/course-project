import NoResults from './NoResults';

export default function Results({ template }) {
	if (template.results.length === 0) {
		return <NoResults />;
	}

	const formatDate = (dateString) => {
		const options = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		};
		return new Date(dateString).toLocaleString(undefined, options);
	};

	console.log(template);
	return (
		<section className="results">
			<div className="results__total">
				<h4>Total forms from this template</h4>
				<p>{template.results.length}</p>
			</div>
			<table className="results__table">
				<thead>
					<tr>
						<th className="results__th">Form id</th>
						<th className="results__th">Username</th>
						<th className="results__th">Created at</th>
						<th className="results__th">Updated at</th>
					</tr>
				</thead>
				<tbody>
					{template.results.map((row) => {
						return (
							<tr key={row.id} className="results__tr">
								<td>{row.id}</td>
								<td>{row.user.username}</td>
								<td>{formatDate(row.created_at)}</td>
								<td>{formatDate(row.updated_at)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
}

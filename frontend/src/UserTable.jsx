export default function UserTable({ rows }) {
	return (
		<table className="userTable">
			<thead className="userTable__thead">
				<tr>
					<th className="userTable__th">Title</th>
					<th className="userTable__th">Topic</th>
					<th className="userTable__th">Public</th>
					<th className="userTable__th">description</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => {
					if (row.template) {
						row = row.template;
					}

					return (
						<tr className="userTable__tr">
							<td>{row.title}</td>
							<td>{row.topic}</td>
							<td>{row.is_public ? 'Yes' : 'No'}</td>
							<td>{row.description}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default function General({ handleTitle }) {
	return (
		<section>
			{' '}
			<div>
				<label htmlFor="title">Title</label>
				<input type="text" onChange={handleTitle} />
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<textarea></textarea>
			</div>
			<div>
				<label htmlFor="tags">Tags</label>
			</div>
			<div>
				<label htmlFor="restricted">
					Do you want to restrict access to this template?
				</label>
				<input type="checkbox" />
			</div>
		</section>
	);
}

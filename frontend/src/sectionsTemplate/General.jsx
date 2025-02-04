export default function General({
	handleTitle,
	handleDescription,
	addTag,
	handleTagInput,
	tag,
}) {
	return (
		<section>
			{' '}
			<div>
				<label htmlFor="title">Title</label>
				<input type="text" onChange={handleTitle} id="title" />
			</div>
			<div>
				<label htmlFor="description">Description</label>
				<textarea onChange={handleDescription} id="description"></textarea>
			</div>
			<div>
				<div>Tags</div>
				<label htmlFor="tags">Add</label>
				<input type="text" onChange={handleTagInput} value={tag} id="tags" />
				<button onClick={addTag}>Add</button>
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

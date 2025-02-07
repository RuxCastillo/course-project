import AutoCompleteRestricted from '../AutoCompleteRestricted';
import ImageUploader from '../imageUploader';

export default function General({
	handleTitle,
	handleDescription,
	addTag,
	handleTagInput,
	tag,
	tags,
	removeTag,
	checkboxRestricted,
	onClickCheckboxRestricted,
	addAllowedUser,
	deleteAllowedUser,
	allowedUsers,
	handleImageUpload,
}) {
	return (
		<section className="general">
			{' '}
			<div className="general__campo">
				<label htmlFor="title" className="general__campo--label">
					Title
				</label>
				<input
					type="text"
					onChange={handleTitle}
					id="title"
					className="general__campo--input"
				/>
			</div>
			<div className="general__campo">
				<label htmlFor="description" className="general__campo--label">
					Description
				</label>
				<textarea
					onChange={handleDescription}
					id="description"
					className="general__campo--input"
				></textarea>
			</div>
			<div className="general__campo">
				<p>Select an image</p>
				<ImageUploader onUpload={handleImageUpload} />
			</div>
			<div className="general__tags">
				<p>Tags</p>
				{/* 				<label htmlFor="tags" className="general__campo--label">
					Add:
				</label> */}
				<input
					type="text"
					className="general__campo--input"
					onChange={handleTagInput}
					value={tag}
					id="tags"
				/>
				<button onClick={addTag} className="general__tags--button">
					Add
				</button>
				<ul className="general__tags--ul">
					{tags.map((tag, idx) => {
						return (
							<li key={idx} className="general__tags--li">
								{tag} <button onClick={() => removeTag(idx)}>Remove</button>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="general__checkbox-div">
				<label htmlFor="restricted" className="general__checkbox-div--label">
					Do you want to restrict access to this template?
				</label>
				<input
					type="checkbox"
					value={checkboxRestricted}
					onChange={onClickCheckboxRestricted}
				/>
				{checkboxRestricted && (
					<AutoCompleteRestricted
						addAllowedUser={addAllowedUser}
						deleteAllowedUser={deleteAllowedUser}
						allowedUsers={allowedUsers}
					/>
				)}
			</div>
		</section>
	);
}

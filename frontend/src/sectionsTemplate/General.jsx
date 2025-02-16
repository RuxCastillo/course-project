import AutoCompleteRestricted from '../AutoCompleteRestricted';
import ImageUploader from '../imageUploader';
import { useTranslation } from 'react-i18next';

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
	template,
}) {
	const { t } = useTranslation();
	return (
		<section className="general">
			{' '}
			<div className="general__campo">
				<label htmlFor="title" className="general__campo--label">
					{t('title')}
				</label>
				<input
					type="text"
					onChange={handleTitle}
					id="title"
					className="general__campo--input"
					value={template.title}
				/>
			</div>
			<div className="general__campo">
				<label htmlFor="description" className="general__campo--label">
					{t('description')}
				</label>
				<textarea
					onChange={handleDescription}
					id="description"
					className="general__campo--input"
					value={template.description}
				></textarea>
			</div>
			<div className="general__campo">
				<p>{t('select_image')}</p>
				<ImageUploader onUpload={handleImageUpload} />
			</div>
			<div className="general__tags">
				<p>{t('tags')}</p>
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
					{t('add')}
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
					{t('restrict_access')}
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

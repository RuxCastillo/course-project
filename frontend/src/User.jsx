import Search from './Search';
import { Link } from 'react-router-dom';

export default function User() {
	return (
		<main>
			<Search />
			<div className="user">
				<h1>User</h1>
				<img src="" alt="imagen" />
			</div>
			<div>table 1</div>
			<div>table 2</div>
			<Link to="/createTemplate">create template</Link>
		</main>
	);
}

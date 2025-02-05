export function handleSignOut() {
	dispatch({ type: 'LOGOUT' });
	navigate('/');
	console.log(localStorage);
}

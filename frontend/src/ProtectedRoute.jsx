import { useGlobalState } from './store/GlobalState';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

let API_URL = import.meta.env.VITE_API_URL;
if (import.meta.env.PROD) {
	API_URL = '';
}

const ProtectedRoute = ({ children }) => {
	const { state, dispatch } = useGlobalState();
	const [isLoading, setIsLoading] = useState(true);
	const [isValidToken, setIsValidToken] = useState(false);

	useEffect(() => {
		const checkTokenAndFetchUserData = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				setIsLoading(false);
				setIsValidToken(false);
				return;
			}

			try {
				const response = await fetch(`${API_URL}/api/auth/validateToken`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.ok) {
					const data = await response.json();
					dispatch({ type: 'LOGIN', payload: token });
					setIsValidToken(true);

					// Fetch user data after token validation
					const userResponse = await fetch(`${API_URL}/api/user/userData`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const userData = await userResponse.json();
					console.log('la informacion del usuario', userData);
					dispatch({ type: 'SET_USER_DATA', payload: userData });
					console.log(state);
				} else {
					setIsValidToken(false);
				}
			} catch (error) {
				console.error('Error validating token:', error);
				setIsValidToken(false);
			} finally {
				setIsLoading(false);
			}
		};

		checkTokenAndFetchUserData();
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isValidToken) {
		// Redirect to login page if not authenticated
		return <Navigate to="/login" />;
	}
	// Render the protected component if authenticated
	return children;
};

export default ProtectedRoute;

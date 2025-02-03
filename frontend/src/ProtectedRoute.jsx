import { useGlobalState } from './store/GlobalState';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { state } = useGlobalState();

	if (!state.isAuth) {
		// Redirect to login page if not authenticated
		return <Navigate to="/login" />;
	}

	// Render the protected component if authenticated
	return children;
};

export default ProtectedRoute;

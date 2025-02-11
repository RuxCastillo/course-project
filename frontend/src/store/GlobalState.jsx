import { createContext, useReducer, useContext } from 'react';
import { useEffect } from 'react';

const initialState = {
	isAuth: false,
	user: null,
	token: null,
	profileImage: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuth: true,
				token: action.payload,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				user: null,
			};
		case 'SET_USER_DATA':
			return {
				...state,
				user: action.payload,
			};
		case 'UPDATE_PROFILE_IMAGE':
			return {
				...state,
				profileImage: action.payload,
			};
		case 'SET_LANGUAGE':
			return {
				...state,
				user: {
					...state.user,
					language: action.payload,
				},
			};
		case 'SET_THEME':
			return {
				...state,
				user: {
					...state.user,
					theme: action.payload,
				},
			};
		default:
			return state;
	}
};

const GlobalState = createContext();

export const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (state.user && state.user.theme) {
			dispatch({ type: 'SET_THEME, payload: state.user.theme' });
			const nombreClase = 'dark-mode';
			if (state.user.theme === 'light') {
				document.body.classList.remove('dark-mode');
			} else {
				document.body.classList.add('dark-mode');
			}
		}
	}, [state.user]);

	return (
		<GlobalState.Provider value={{ state, dispatch }}>
			{children}
		</GlobalState.Provider>
	);
};

export const useGlobalState = () => {
	return useContext(GlobalState);
};

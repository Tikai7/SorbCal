import React from 'react';
import AcceuilDrawer from './routes/AcceuilDrawer';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
	return (
		<NavigationContainer>
			<AcceuilDrawer />
		</NavigationContainer>
	);
}

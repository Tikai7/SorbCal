import React from 'react';
import { View } from 'react-native';
import Acceuil from './components/Acceuil';
import { containerStyle } from './styles/MainStyle';

export default function App() {
	return (
		<View style={containerStyle.container}>
			<Acceuil />
		</View>
	);
}

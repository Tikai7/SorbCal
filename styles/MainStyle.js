import { StyleSheet } from 'react-native';

export const colorStyle = {
	primary : "#263068",
	secondary : "#E6332A",
	tertiary : "#E8F0FE",
	white: "#FFFFFF",
	secondarySoft : "rgba(230,51,42,0.2)"
}

export const fontStyle = {
	big : 20,
	lessBig : 18,
	medium : 16,
	small : 12,
}

export const headerStyle = StyleSheet.create({
	acceuilHeader : {
		backgroundColor:colorStyle.primary,
		paddingTop:  "15%",
		flexDirection:"row-reverse",
		paddingBottom:"5%",
		justifyContent:"space-between",
		alignItems:"center"
	}
});

export const buttonStyle = StyleSheet.create({
	button: {
		backgroundColor: colorStyle.primary,
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: colorStyle.white,
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export const textStyle = StyleSheet.create({
	title: {
		flex: 1,
		fontSize: fontStyle.lessBig,
		fontWeight: 'bold',
		color: colorStyle.white,
		textAlign: 'center',
		marginLeft: "-9%",
	},
	subtitle: {
		fontSize: fontStyle.big,
		fontWeight: 'bold',
		color: colorStyle.primary,
		textAlign: 'center',
	},
	subsubtitle: {
		fontSize: fontStyle.small,
		color: colorStyle.primary,
		textAlign: 'center',
	},
	parcours: {
		fontSize: fontStyle.lessBig,
		fontWeight: 'bold',
		color: colorStyle.secondary,
		textAlign: 'center',
	}
});	

export const containerStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorStyle.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyContainer:{
		width:"100%",
		height:"100%",
		backgroundColor: colorStyle.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer : {
		marginBottom:"20%",
		alignItems:"center",
		justifyContent:"center",
		backgroundColor:colorStyle.tertiary,
		padding:"5%",
		borderRadius:10,
	},
	parcoursContainer : {
		marginBottom:"3%",
		alignItems:"center",
		justifyContent:"center",
		backgroundColor: colorStyle.secondarySoft,
		paddingHorizontal:"7%",
		paddingVertical:"2%",
		borderRadius:10,
	},
});

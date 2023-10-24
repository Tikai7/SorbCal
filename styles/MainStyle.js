import { StyleSheet } from 'react-native';
import { height, width } from '../utils/AllParcours';

// Not the official colors of Sorbonne Université
export const colorStyle = {
	primary : "#25305a",
	secondary : "#E7322B",
	tertiary : "#E9F0FD",
	white : "#FFFFFF",
	secondarySoft : "rgba(231,50,43,0.2)",
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
	drawerButton : {
		width:"100%",
		height: 60,
		backgroundColor: colorStyle.white,
		alignItems: 'flex-start',
		justifyContent: 'center',
		paddingLeft:"7%",
	},
	drawerHeaderButton : {
		width:"45%",
		height: 40,
		backgroundColor: colorStyle.white,
		borderRadius:10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabIcon:{
		paddingTop:"5%",
		paddingBottom:"2%",
		flexDirection:"column",
		alignItems:"center",
		justifyContent:"center",
	},
	ueButton:{
		backgroundColor: colorStyle.tertiary,
		padding:"2%",
		paddingHorizontal:"5%",
		margin:"1%",
		borderRadius:5,
		alignItems:"center",
		justifyContent:"center",
	},
	primaryButton:{
		backgroundColor: colorStyle.secondary,
		width:"85%",
		height: 50,
		padding:"3%",
		paddingHorizontal:"5%",
		margin:"1%",
		borderRadius:10,
		alignItems:"center",
		justifyContent:"center",
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
	},
	drawerText:{
		fontWeight: "600",
		fontSize: fontStyle.medium,
		color: colorStyle.primary,
		textAlign: 'left',
	},
	planningText:{
		fontWeight: "600",
		fontSize: fontStyle.small,
		color: colorStyle.white,
		textAlign: 'left',
	},
	primaryText:{
		fontWeight: "600",
		fontSize: fontStyle.medium,
		color: colorStyle.white,
		textAlign: 'left',
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
		marginBottom:"15%",
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
	lineContainer:{
		width:"100%",
		height:1,
		backgroundColor:colorStyle.tertiary,
	},
	scrollViewContainer:{
		backgroundColor: colorStyle.white,
		marginBottom:"20%",
	},
	safeContainer:{
		flex: 1,
		flexDirection:"column",
		backgroundColor: colorStyle.white,
	},
	drawerHeaderContainer:{
		paddingTop:"25%",
		alignItems:"center",
		justifyContent:"center",
		backgroundColor: colorStyle.primary,
		paddingHorizontal:"5%",
		paddingVertical:"2%",
		borderBottomLeftRadius:15,
		borderBottomRightRadius:15,
		marginBottom:"10%",
	},
	drawerButtonContainer:{
		width:"100%",
		flexDirection:"row",
		paddingBottom:"5%",
		justifyContent:"space-between",
		paddingHorizontal:"5%"
	},
	planningContainer:{
		backgroundColor: colorStyle.secondary,
		width: width*0.9,
		height: height*0.1,
		padding : 10,
		borderRadius:10,
		margin:"1%",
		alignItems:"flex-start",
		justifyContent:"center",
	},
	planningHeader:{
		backgroundColor: colorStyle.white,
		width: width*0.9,
		height: height*0.1,
		padding : 10,
		borderRadius:10,
		margin:"1%",
		alignItems:"flex-start",
		justifyContent:"center",
	},
	tabContainer:{
		flexDirection:"row",
		justifyContent:"space-around",
		paddingHorizontal:"5%",
		paddingVertical:"2%",
		backgroundColor: colorStyle.white,
	},
	ueContainer:{
		backgroundColor: colorStyle.white,
		width: "100%",
		height:"100%",
		padding : "5%",
		alignItems:"flex-start",
		justifyContent:"flex-start",
	},
	ueElements:{
		flexDirection:"row",
		flexWrap:"wrap",
		paddingVertical:"2%",
		paddingHorizontal:"5%",
	},
	ueInfo:{
		alignItems:"flex-start",
		justifyContent:"flex-start",
	},
	lvlContainer:{
		alignSelf:"center",
		flexDirection:"row",
		justifyContent:"space-between",
		borderBottomLeftRadius:15,
		borderBottomRightRadius:15,
		paddingHorizontal:"5%",
		paddingVertical:"5%",
		alignItems:"center",
		backgroundColor: colorStyle.primary,
	}
});

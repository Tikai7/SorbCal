import React from 'react';
import { View, Text } from 'react-native';
import { headerStyle,textStyle,colorStyle } from '../styles/mainstyle';
import { Entypo } from '@expo/vector-icons'; 

export default function AcceuilHeader({route,navigation}) {  
    const headerName = {
        "Acceuil":"Aujourd'hui",
    }

    function handleDrawer(){
        navigation.openDrawer()
    }

    return (
        <View style={headerStyle.acceuilHeader}>
            <Entypo 
                style={{alignItems:"flex-start",marginRight:"5%"}} 
                onPress={handleDrawer} 
                name="plus"  
                size={24} 
                color={colorStyle.white} 
            />
            <Text style={{...textStyle.title,marginLeft:0}}>{headerName[route.name]}</Text>
            <Entypo 
                style={{alignItems:"flex-start",paddingLeft:"5%"}} 
                onPress={handleDrawer} 
                name="calendar"  
                size={24} 
                color={colorStyle.white} 
            />
        </View>
    )
}

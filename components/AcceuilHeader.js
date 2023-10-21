import React from 'react';
import { View, Text } from 'react-native';
import { headerStyle,textStyle,colorStyle } from '../styles/mainstyle';
import { Entypo } from '@expo/vector-icons'; 

export default function AcceuilHeader({route,navigation}) {  
    const headerName = {
        "Calendar":"Aujourd'hui",
    }

    function handleDrawer(){
        navigation.openDrawer()
    }

    return (
        <View style={headerStyle.acceuilHeader}>
            <Text style={textStyle.title}>{headerName[route.name]}</Text>
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

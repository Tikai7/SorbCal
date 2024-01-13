import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { headerStyle,textStyle,colorStyle } from '../styles/mainstyle';
import { Entypo } from '@expo/vector-icons'; 

export default function AcceuilHeader({route,navigation}) {  
    const headerName = {
        "Acceuil":"Aujourd'hui",
        "Personal":"Mon Calendrier"
    }

    function handleDrawer(){
        console.log(navigation.navigate)
        if (route.name === "PersonalCalendar")
            navigation.navigate("Acceuil")
        
        navigation.openDrawer()
    }

    return (
        <View style={headerStyle.acceuilHeader}>
            <Text style={textStyle.title}>{headerName[route.name]}</Text>
            <TouchableOpacity onPress={handleDrawer}>
                <Entypo 
                    style={{alignItems:"flex-start",paddingLeft:"5%"}} 
                    name="menu"  
                    size={27} 
                    color={colorStyle.white} 
                />
            </TouchableOpacity>
        </View>
    )
}

import React from 'react'
import { useState } from 'react'
import { View,Text,ScrollView, TouchableOpacity } from 'react-native'
import { buttonStyle, colorStyle, containerStyle, textStyle } from '../styles/mainstyle'
import DrawerHeader from './DrawerHeader'

export default function CustomPersonalDrawer({navigation}) {    
    const navigationScreens = {"Acceuil":"Acceuil","EDT Personnel":"PersonalCalendar"}
    const [screen,setScreen] = useState("Acceuil")
    function handleNavigation(p){
        setScreen(p)
        navigation.navigate(navigationScreens[p])
    }

    function renderParcours({element}) {
        return (
            <View key={element}>
                <TouchableOpacity 
                    onPress={()=>{handleNavigation(element)}} 
                    style={{...buttonStyle.drawerButton,backgroundColor : screen == element ? colorStyle.tertiary : colorStyle.white }}
                >
                    <Text style={textStyle.drawerText}>{element}</Text>
                </TouchableOpacity>
                <View style={containerStyle.lineContainer}/>
            </View>
        )
    }

    return (
        <View style={containerStyle.safeContainer}>
            <DrawerHeader text={"Votre EDT personnel"}/>
            <ScrollView style={containerStyle.scrollViewContainer}>
                {Object.keys(navigationScreens).map(element => renderParcours({element}))}
            </ScrollView>
        </View>
    )
}
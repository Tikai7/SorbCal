import React from 'react'
import { useState } from 'react'
import { View,Text,ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { buttonStyle, colorStyle, containerStyle, textStyle } from '../styles/mainstyle'
import { Octicons,Entypo } from '@expo/vector-icons'; 

export default function CustomTab({route,navigation}) {    
    const [active,setActive] = useState("Acceuil")
    const [firstScreen,secondScreen] = ["Acceuil","Personal"]
    
    function handleNavigation(to){
        setActive(to)
        navigation.navigate(to)
    }
    return (
        <SafeAreaView style={containerStyle.tabContainer}>
            <TouchableOpacity onPress={()=>{handleNavigation(firstScreen)}} style={buttonStyle.tabIcon}>
                <Octicons name="home" size={24} color={active === firstScreen ? colorStyle.secondary : colorStyle.primary} />
                <Text  style={{...textStyle.subsubtitle,color:active === firstScreen ? colorStyle.secondary : colorStyle.primary}}>Parcours</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{handleNavigation(secondScreen)}} style={buttonStyle.tabIcon}>
                <Entypo 
                    name="calendar"  
                    size={24} 
                    color={active === secondScreen ? colorStyle.secondary : colorStyle.primary} 
                />            
                <Text style={{...textStyle.subsubtitle,color:active === secondScreen ? colorStyle.secondary : colorStyle.primary}}>Mon calendrier</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
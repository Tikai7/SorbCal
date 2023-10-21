import React from 'react'
import { View,Text,ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import { allParcours } from './AllParcours'
import { buttonStyle, colorStyle, containerStyle, textStyle } from '../styles/mainstyle'
import DrawerHeader from './DrawerHeader'
import { useContext } from 'react'
import { UserData } from '../context/contextData'

export default function CustomDrawer() {
    const {parcours,setparcours} = useContext(UserData)
    
    function handleParcours(p){
        setparcours(p)
    }
    function renderParcours({element}) {
        return (
            <View key={element}>
                <TouchableOpacity 
                    onPress={()=>{handleParcours(element)}} 
                    style={{...buttonStyle.drawerButton,backgroundColor : parcours == element ? colorStyle.tertiary : colorStyle.white }}
                >
                    <Text style={textStyle.drawerText}>{element}</Text>
                </TouchableOpacity>
                <View style={containerStyle.lineContainer}/>
            </View>
        )
    }

    return (
        <View style={containerStyle.safeContainer}>
            <DrawerHeader/>
            <ScrollView style={containerStyle.scrollViewContainer}>
                {allParcours.map(element => renderParcours({element}))}
            </ScrollView>
        </View>
    )
}
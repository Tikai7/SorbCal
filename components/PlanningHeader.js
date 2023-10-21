import React from 'react';
import { View, Text } from 'react-native';
import { textStyle,containerStyle, fontStyle, colorStyle } from '../styles/mainstyle';
import { useContext } from 'react';
import { UserData } from '../context/contextData';

export default function PlanningHeader(){
    const currentDate = new Date()
    const {niveau,parcours} = useContext(UserData)
    return (
        <View style={containerStyle.planningHeader}>
            <Text style={textStyle.subtitle}>Planning <Text style={{color:colorStyle.secondary}}>{niveau}-{parcours}</Text></Text>
            <Text style={{...textStyle.subsubtitle,fontSize:fontStyle.medium}}>UE pour le {currentDate.getDate()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()}</Text>
        </View>
    )
}
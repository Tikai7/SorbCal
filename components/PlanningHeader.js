import React from 'react';
import { View, Text } from 'react-native';
import { textStyle,containerStyle, fontStyle } from '../styles/mainstyle';

export default function PlanningHeader(){
    const currentDate = new Date()
    return (
        <View style={containerStyle.planningHeader}>
            <Text style={textStyle.subtitle}>Planning</Text>
            <Text style={{...textStyle.subsubtitle,fontSize:fontStyle.medium}}>UE pour le {currentDate.getDate()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()}</Text>
        </View>
    )
}
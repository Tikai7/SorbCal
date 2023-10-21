import React from 'react';
import { View, Text } from 'react-native';
import LottieView from "lottie-react-native";
import { containerStyle, textStyle } from '../styles/mainstyle';
import { useContext } from 'react';
import { UserData } from '../context/contextData';

export default function AcceuilEmpty(){
    const {parcours,niveau} = useContext(UserData)

    return (
        <View style={containerStyle.emptyContainer}>
            <View style={containerStyle.parcoursContainer}>
                <Text style={textStyle.parcours}>Parcours : {niveau} {parcours}</Text>
            </View>
            <View style={containerStyle.textContainer}>
                <Text style={textStyle.subtitle}>Vous n'avez rien aujourd'hui !</Text>
                <Text style={textStyle.subsubtitle}>Selectionner un autre parcours</Text>
            </View>
            <View>
                <LottieView 
                    source={require('../images/no_result.json')} 
                    autoPlay 
                    loop 
                    style={{width:350,height:350,marginBottom:"20%"}}
                />
            </View>
        </View>
    )
}
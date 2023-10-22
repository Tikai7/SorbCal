import React from 'react';
import { View, Text } from 'react-native';
import LottieView from "lottie-react-native";
import { containerStyle, textStyle } from '../styles/mainstyle';
import { useEffect,useContext,useRef } from 'react';
import { UserData } from '../context/contextData';

export default function AcceuilEmpty(){
    const {parcours,niveau} = useContext(UserData)
    const lottieRef = useRef(null)

    useEffect(() => {
        // Reset animation on each render
        if (lottieRef.current) {
          setTimeout(() => {
            lottieRef.current?.reset();
            lottieRef.current?.play();
          }, 100);
        }
      }, [lottieRef.current]);

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
                    ref={lottieRef}
                    source={require('../images/no_result.json')} 
                    autoPlay 
                    loop 
                    style={{width:350,height:350,marginBottom:"5%"}}
                    renderMode={"SOFTWARE"}
                />
            </View>
        </View>
    )
}
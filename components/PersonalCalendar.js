import React, { useState,useEffect,useContext,useRef } from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { containerStyle,colorStyle,buttonStyle,textStyle } from "../styles/mainstyle";
import { UserData } from "../context/contextData";
import LottieView from "lottie-react-native";
export default function PersonalCalendar() {
    const {niveau} = useContext(UserData)
    const [falseLvl,setFalseLvl] = useState(niveau)
    
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
                <Text style={textStyle.parcours}>Oops</Text>
            </View>
            <View style={{...containerStyle.textContainer,marginBottom:"-5%"}}>
                <Text style={textStyle.subtitle}>Vous n'avez aucun planning</Text>
            </View>
            <View>
                <LottieView 
                    ref={lottieRef}
                    source={require('../images/no_result.json')} 
                    autoPlay 
                    loop 
                    style={{width:350,height:350}}
                    renderMode={"SOFTWARE"}
                />
            </View>
            <TouchableOpacity style={buttonStyle.primaryButton}>
                <Text style={textStyle.primaryText}>Créer mon planning</Text>
            </TouchableOpacity>
        </View>
    );
}

import React from 'react';
import { View,ScrollView,RefreshControl, Text, TouchableOpacity } from 'react-native';
import LottieView from "lottie-react-native";
import { buttonStyle, containerStyle, textStyle } from '../styles/mainstyle';
import { useEffect,useContext,useRef } from 'react';
import { UserData } from '../context/contextData';

export default function AcceuilEmpty({handleCreate,isPersonal}){
    const {parcours,niveau,setRefreshing} = useContext(UserData)
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

    const onRefresh = () => {
        setRefreshing((old) => !old);
    };

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            refreshControl={
                <RefreshControl
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={containerStyle.emptyContainer}>
                <View style={containerStyle.parcoursContainer}>
                    <Text style={textStyle.parcours}>{!isPersonal ? `Parcours : ${niveau} ${parcours}` : "Let's go" }</Text>
                </View>
                <View style={{...containerStyle.textContainer,marginBottom:isPersonal ? "7%" : "15%"}}>
                    <Text style={textStyle.subtitle}>Vous n'avez rien aujourd'hui !</Text>
                    {!isPersonal && <Text style={textStyle.subsubtitle}>Sélectionner un autre parcours</Text>}
                </View>
                <View>
                    <LottieView 
                        ref={lottieRef}
                        source={require('../images/no_result.json')} 
                        autoPlay 
                        loop 
                        style={{width:350,height:350,marginBottom: isPersonal ? "0%" : "5%"}}
                        renderMode={"SOFTWARE"}
                    />
                </View>
                {isPersonal && <TouchableOpacity onPress={handleCreate} style={buttonStyle.secondaryButton}>
                    <Text style={textStyle.seconaryText}>Modifier votre planning</Text>
                </TouchableOpacity>}
            </View>
        </ScrollView>
    )
}
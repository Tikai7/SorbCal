import React, { useContext, useEffect,useRef } from 'react';
import { View, Text,FlatList,Animated,RefreshControl } from 'react-native';
import { colorStyle, containerStyle, fontStyle, textStyle } from '../styles/mainstyle';
import { allUE,colorParcours } from '../utils/AllParcours';
import { UserData } from '../context/contextData'; 

export default function UECalendar(){
    const {myLVL,myCalendar} = useContext(UserData)
    const animatedValues = useRef(myCalendar.map(() => new Animated.Value(0))).current;
    const currentDate = new Date()

    useEffect(() => {
        console.log(myCalendar)
        const animations = myCalendar.map((_, index) => {
          return Animated.timing(animatedValues[index], {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            delay: index , // Delay each animation by 500 milliseconds
          });
        });
    
        Animated.sequence(animations).start();
    }, [animatedValues, myCalendar]);


    // Assing a color to each UE
    function checkParcours(item) {
        // Check to which courses the UE belongs
        for (const value of Object.keys(allUE[myLVL])) {
            for (const UE of allUE[myLVL][value]) {
                if(item?.includes(UE)){
                    return value
                }
            }
        }
        // Default case is IMA 
        return "IMA"
    }


    const convertDateToString = (date) => {
        // Convert date to string and add a 0 if needed
        avoidData = ["8","9"]
        if (!(date instanceof Date)) 
            date = new Date(date)
        stringDate = date.getUTCHours() + "h" + date.getMinutes()

        while (stringDate.length < 5 && avoidData.includes(stringDate[0])) 
            stringDate = "0"+stringDate
        if (stringDate.length < 5)
            stringDate = stringDate + "0"

        return stringDate
    }

    function renderPlanning(item,value) {
        const itemValue = item.summary?.value.substring(item.summary?.value.indexOf('-') + 1);
        const itemLocation = item.location?.value
        const itemBegin = convertDateToString(item.dtstart?.value)

        return (
            <Animated.View 
                // style={{...containerStyle.planningContainer,backgroundColor:colorParcours[niveau][checkParcours(itemValue)]}}
                style={[
                    {...containerStyle.planningContainer,backgroundColor:colorParcours[myLVL][checkParcours(itemValue)]},
                    {
                    opacity: value,
                    transform: [
                        {
                        translateY: value.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                        }),
                        },
                    ],
                    },
                ]}
                        
                >
            {/* <View style={containerStyle.planningContainer}> */}
                <Text style={{...textStyle.planningText,fontSize:fontStyle.lessBig}}>{itemValue}</Text>
                <Text style={{...textStyle.planningText,fontSize:fontStyle.medium}}>{itemBegin}</Text>
                <Text style={{...textStyle.planningText,fontSize:fontStyle.medium}}>{itemLocation}</Text> 
            </Animated.View >
        );
    }

    function UEHeader(){
        return(
            <View style={containerStyle.planningHeader}>
                <Text style={textStyle.subtitle}>Planning <Text style={{color:colorStyle.secondary}}>{"UE"}</Text></Text>
                <Text style={{...textStyle.subsubtitle,fontSize:fontStyle.medium}}>UE pour le {currentDate.getDate()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()}</Text>
            </View>
        )
    }
    
    return (
        <View style={containerStyle.safeContainer}>
            <FlatList
                ListHeaderComponent={<UEHeader/>}
                data={myCalendar}
                renderItem={({ item }) => renderPlanning(item,animatedValues[myCalendar.indexOf(item)])}
                keyExtractor={(_,index)=>index}
                ListFooterComponent={<View style={{height:50}}></View>}
            />
        </View>
    )
}
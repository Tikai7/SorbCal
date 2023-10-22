import React, { useContext, useEffect,useRef } from 'react';
import { View, Text,FlatList,Animated,RefreshControl } from 'react-native';
import { containerStyle, fontStyle, textStyle } from '../styles/mainstyle';
import { allUE,colorParcours } from '../utils/AllParcours';
import { UserData } from '../context/contextData';
import PlanningHeader from './PlanningHeader';
 

export default function AcceuilCalendar({calendar}){
    const {niveau,setRefreshing} = useContext(UserData)
    const animatedValues = useRef(calendar.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const animations = calendar.map((_, index) => {
          return Animated.timing(animatedValues[index], {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            delay: index , // Delay each animation by 500 milliseconds
          });
        });
    
        Animated.sequence(animations).start();
    }, [animatedValues, calendar]);


    // Assing a color to each UE
    function checkParcours(item) {
        // Check to which courses the UE belongs
        for (const value of Object.keys(allUE[niveau])) {
            for (const UE of allUE[niveau][value]) {
                if(item.includes(UE)){
                    return value
                }
            }
        }
        // Default case is IMA 
        return "IMA"
    }

    const onRefresh = () => {
        setRefreshing((old) => !old);
    };

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
                    {...containerStyle.planningContainer,backgroundColor:colorParcours[niveau][checkParcours(itemValue)]},
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

    
    return (
        <View style={containerStyle.safeContainer}>
            <FlatList
                ListHeaderComponent={<PlanningHeader/>}
                data={calendar}
                renderItem={({ item }) => renderPlanning(item,animatedValues[calendar.indexOf(item)])}
                keyExtractor={(_,index)=>index}
                ListFooterComponent={<View style={{height:50}}></View>}
                refreshControl={
                    <RefreshControl
                    //   refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
            />
        </View>
    )
}
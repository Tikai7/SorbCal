import React, { useContext, useEffect } from 'react';
import { View, Text,FlatList } from 'react-native';
import { containerStyle, fontStyle, textStyle } from '../styles/mainstyle';
import { allUE,colorParcours } from '../utils/AllParcours';
import { UserData } from '../context/contextData';
import PlanningHeader from './PlanningHeader';
 

export default function AcceuilCalendar({calendar}){

    const {niveau} = useContext(UserData)
    
    function checkParcours(item) {

        for (const value of Object.keys(allUE[niveau])) {
            for (const UE of allUE[niveau][value]) {
                if(item.includes(UE)){
                    return value
                }
            }
        }
        return "IMA"
    }

    useEffect(()=>{
        console.log("New Calendar")
    },[calendar])


    const convertDateToString = (date) => {
        if (!(date instanceof Date)) 
            date = new Date(date)
        stringDate = date.getUTCHours() + "h" + date.getMinutes()

        if (stringDate.length < 5 && stringDate[0] != "0") 
            stringDate = "0"+stringDate
        else if (stringDate.length < 5)
            stringDate = stringDate + "0"

        return stringDate
    }

    function renderPlanning(item) {
        const itemValue = item.summary?.value.substring(item.summary?.value.indexOf('-') + 1);
        const itemLocation = item.location?.value
        const itemBegin = convertDateToString(item.dtstart?.value)
        return (
            <View style={{...containerStyle.planningContainer,backgroundColor:colorParcours[niveau][checkParcours(itemValue)]}}>
            {/* <View style={containerStyle.planningContainer}> */}
                <Text style={{...textStyle.planningText,fontSize:fontStyle.lessBig}}>{itemValue}</Text>
                <Text style={{...textStyle.planningText,fontSize:fontStyle.medium}}>{itemBegin}</Text>
                <Text style={{...textStyle.planningText,fontSize:fontStyle.medium}}>{itemLocation}</Text> 
            </View>
        );
    }

    
    return (
        <View style={containerStyle.safeContainer}>
            <FlatList
                ListHeaderComponent={<PlanningHeader/>}
                data={calendar}
                renderItem={({ item }) => renderPlanning(item)}
                keyExtractor={(_,index)=>index}
                ListFooterComponent={<View style={{height:50}}></View>}
            />
        </View>
    )
}
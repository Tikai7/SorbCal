import React from 'react';
import { Text,Animated } from 'react-native';
import { containerStyle, fontStyle, textStyle } from '../styles/mainstyle';
import { colorParcours } from '../utils/AllParcours';
import { convertDateToString } from '../utils/Functions';


export function renderPlanning(item,value,checkParcours,niveau){
    const itemValue = item.summary?.value.substring(item.summary?.value.indexOf('-') + 1);
    const itemLocation = item.location?.value
    const itemBegin = convertDateToString(item.dtstart?.value)
    const itemEnd = convertDateToString(item.dtend?.value)

    return (
        <Animated.View 
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
            <Text style={{...textStyle.planningText,fontSize:fontStyle.medium}}>{itemBegin}-{itemEnd}</Text>
            <Text style={{...textStyle.planningText,fontSize:fontStyle.medium}}>{itemLocation}</Text> 
        </Animated.View >
    );
}
import React, { useContext, useEffect,useRef } from 'react';
import { View,FlatList,Animated,RefreshControl } from 'react-native';
import { containerStyle } from '../styles/mainstyle';
import { allUE } from '../utils/AllParcours';
import { renderPlanning } from './RenderPlaning';
import { UserData } from '../context/contextData';
import PlanningHeader from './PlanningHeader';
 

export default function AcceuilCalendar({myEDT,calendar}){
    const {niveau,setRefreshing,myLVL} = useContext(UserData)
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
        for (const value of Object.keys(allUE[myEDT ? myLVL : niveau])) {
            for (const UE of allUE[myEDT ? myLVL : niveau][value]) {
                if(item.includes(UE)){
                    return value
                }
            }
        }
        // Default case is IMA 
        return "IMA"
    }

    const onRefresh = () => {
        if (myEDT)
            return
        setRefreshing((old) => !old);
    };

    return (
        <View style={containerStyle.safeContainer}>
            <FlatList
                ListHeaderComponent={<PlanningHeader myEDT={myEDT}/>}
                data={calendar}
                renderItem={({ item }) => renderPlanning(item,animatedValues[calendar.indexOf(item)],checkParcours,niveau)}
                keyExtractor={(_,index)=>index}
                ListFooterComponent={<View style={{height:50}}></View>}
                refreshControl={
                    <RefreshControl
                      onRefresh={onRefresh}
                    />
                  }
            />
        </View>
    )
}
import React, { useContext, useEffect,useRef,useState } from 'react';
import { View, Text,FlatList,Animated,RefreshControl, Touchable, TouchableOpacity } from 'react-native';
import { colorStyle, containerStyle, fontStyle, textStyle } from '../styles/mainstyle';
import { allUE } from '../utils/AllParcours';
import { renderPlanning } from './RenderPlaning';
import { UserData } from '../context/contextData'; 
import { Feather,FontAwesome5 } from '@expo/vector-icons'; 

export default function UECalendar({handleCreate}){
    const {myLVL,myCalendar,setRefreshing,offset,setOffset,currentDate,setCurrentDate} = useContext(UserData)
    const animatedValues = useRef(myCalendar.map(() => new Animated.Value(0))).current;

    useEffect(() => {
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


    function handleNextDay(){
        setCurrentDate(old=>new Date(old.setDate(old.getDate()+1)))
        setOffset(old=>old+1)
    }

    function handlePreviousDay(){
        setCurrentDate(old=>new Date(old.setDate(old.getDate()-1)))
        setOffset(old=>old-1)
    }

    function UEHeader(){
        return(
            <View style={{...containerStyle.planningHeader,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                <View style={{alignItems:"flex-start"}}>
                    <Text style={textStyle.subtitle}>Planning <Text style={{color:colorStyle.secondary}}>{"UE"}</Text></Text>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <TouchableOpacity onPress={handlePreviousDay} style={{marginRight:"4%"}}>
                            <FontAwesome5 name="backward" size={16} color={colorStyle.primary} />
                        </TouchableOpacity>
                        <Text style={{...textStyle.subsubtitle,fontSize:fontStyle.medium}}>UE pour le {currentDate.getDate()}/{currentDate.getMonth()+1}/{currentDate.getFullYear()}</Text>
                        <TouchableOpacity onPress={handleNextDay} style={{marginLeft:"4%"}}>
                            <FontAwesome5 name="forward" size={16} color={colorStyle.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Feather  onPress={handleCreate} name="edit" size={24} color={colorStyle.secondary} />
            </View>
        )
    }

    function onRefresh(){
        setRefreshing(old=>!old)
    }
    

    return (
        <View style={containerStyle.safeContainer}>
            <FlatList
                ListHeaderComponent={<UEHeader/>}
                data={myCalendar}
                renderItem={({ item }) => renderPlanning(item,animatedValues[myCalendar.indexOf(item)],checkParcours,myLVL)}
                keyExtractor={(_,index)=>index}
                ListFooterComponent={<View style={{height:50}}></View>}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    )
}
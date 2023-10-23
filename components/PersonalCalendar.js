import React, { useState } from "react";
import { View, Text,TouchableOpacity } from "react-native";
import { allUE } from "../utils/AllParcours";
import { containerStyle,colorStyle,buttonStyle,textStyle } from "../styles/mainstyle";
import { useContext } from "react";
import { UserData } from "../context/contextData";
export default function PersonalCalendar() {
    const [ue,setUE]= useState([])

    function renderUE(element){
        return (
            <View>
                <Text>{element}</Text>
                <View>
                    {allUE["M1"][element].map(ue => {
                        return (
                            <TouchableOpacity>
                                <Text style={textStyle.subsubtitle}>{ue}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }

    return (
        <View>
            <Text>Y'a R</Text>
        </View>
    );
}

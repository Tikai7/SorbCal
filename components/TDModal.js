import React, { useEffect } from 'react';
import { useState,useContext } from 'react';
import { SafeAreaView,Text,TouchableOpacity,ScrollView,View } from 'react-native';
import { containerStyle,colorStyle, fontStyle,textStyle,buttonStyle } from '../styles/mainstyle';
import { Ionicons } from '@expo/vector-icons';
import { UserData } from '../context/contextData';
import { storeMyData } from '../utils/Functions';

export default function TDModal({handleCreate,handleReturn,allUE,falseLvl}){

    const {setMyUE,setMyLVL,setMyGroups,setRefreshing} = useContext(UserData)

    const groups = [1,2,3,4,5]
    const initialState = {};
    allUE.forEach((ue) => {
        initialState[ue] = 1;
    });

    const [groupsSelected, setGroupsSelected] = useState(initialState);

    function renderHeader(){
        return(
            <View style={{...containerStyle.drawerButtonContainer,justifyContent:"center",marginTop:"5%"}}>
                <TouchableOpacity onPress={handleReturn}>
                    <Ionicons name="arrow-back" size={30} color={colorStyle.white} />
                </TouchableOpacity>
                <Text style={{
                    ...textStyle.subtitle,
                    color:colorStyle.white,
                    fontSize:fontStyle.lessBig,
                    paddingTop:"2%",
                    paddingLeft:"5%"
                }}>Sélectionner vos groupes</Text>
            </View>
            
        )
    }

    async function handleFinish(){
        console.log("[INFO] Saving data...")
        await storeMyData("myGroups",groupsSelected)
        await storeMyData("myLVL",falseLvl)
        await storeMyData("myUE",allUE)
        handleReturn()
        setMyUE([...allUE])
        setMyLVL(falseLvl)
        setMyGroups({...groupsSelected})
        setRefreshing((old)=>!old)
        handleCreate()
    }

    function renderFooter(){
        return(
            <TouchableOpacity onPress={handleFinish} style={{...buttonStyle.primaryButton,marginTop:"5%"}}>
                <Text style={textStyle.primaryText}>Créer EDT</Text>
            </TouchableOpacity>
        )
    }

    function addGroupe(groupe,UE){
        const tempGroup = { ...groupsSelected }; 
        tempGroup[UE] = groupe; 
        setGroupsSelected(tempGroup); 
    }


    function renderUE(ue,index){
        return(
            <View key={index} style={containerStyle.groupContainer} >
                <Text style={textStyle.parcours}>{ue} : </Text>
                {groups.map((numGroupe)=>{
                    return (
                        <TouchableOpacity 
                            onPress={()=>addGroupe(numGroupe,ue)} 
                            key={numGroupe} 
                            style={{
                                ...buttonStyle.ueButton,
                                width:"25%",
                                backgroundColor: groupsSelected[ue] == numGroupe ? colorStyle.secondarySoft : colorStyle.tertiary
                            }}>
                            <Text style={textStyle.subsubtitle}>TD {numGroupe}</Text>
                        </TouchableOpacity>  
                    )
                })}
                <View style={{...containerStyle.lineContainer,marginVertical:"5%"}}/>
            </View>
        )
    }

    return (
        <SafeAreaView style={containerStyle.safeAreaContainer}> 
            {renderHeader()}
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={containerStyle.ueContainer}>
                    {allUE.map((ue,index)=>{
                        return renderUE(ue,index)
                    })}
                </View>
            </ScrollView>   
            {renderFooter()}
        </SafeAreaView>
    )
}
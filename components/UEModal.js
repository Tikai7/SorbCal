import React, { useEffect } from 'react';
import { useState,useContext } from 'react';
import { SafeAreaView,Text,TouchableOpacity,ScrollView,View, Modal } from 'react-native';
import { containerStyle,textStyle,buttonStyle,colorStyle, fontStyle } from '../styles/mainstyle';
import { allUEsorted } from '../utils/AllParcours';
import { Ionicons } from '@expo/vector-icons'; 
import { UserData } from '../context/contextData';
import TDModal from './TDModal';

export default function UEModal({handleCreate}){
    const [allUE,setAllUE] = useState([])
    const [falseLvl,setFalseLvl] = useState("M1")
    const [showGroupe,setShowGroupe] = useState(false)

    function renderUE(element,index){
        return (
           <TouchableOpacity 
                onPress={()=>addUE(element)} key={index} 
                style={{
                    ...buttonStyle.ueButton,
                    backgroundColor: allUE.includes(element) ? colorStyle.secondarySoft : colorStyle.tertiary
                }}>
                <Text style={textStyle.subsubtitle}>{element}</Text>
            </TouchableOpacity>  
        )
    }

    function handleNext(){
        if (allUE.length == 0)
            return
        
        setShowGroupe(old => !old)
    }

    function addUE(element){
        // If the element is already in the array, we remove it
        if (allUE.includes(element)){
            setAllUE((old) => old.filter((item) => item != element))
            return
        }
        // If the array is full, we don't add the element
        if (allUE.length > 7)
            return
        setAllUE((old) => [...old,element])
    }

    function handlePress(lvl){
        setFalseLvl(lvl)
    }

    function renderHeader(){
        return(
            <View style={containerStyle.lvlContainer}>
                    <TouchableOpacity style={{marginRight:"10%"}} onPress={handleCreate}>
                        <Ionicons name="arrow-back" size={24} color={colorStyle.white} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={()=>handlePress("M1")}
                        style={{
                            ...buttonStyle.drawerHeaderButton,
                            marginHorizontal:"2%",
                            width:"30%",
                            backgroundColor: falseLvl == "M1" ? colorStyle.secondary : colorStyle.tertiary
                        }}>
                        <Text style={{...textStyle.drawerText,fontWeight:"bold",color:falseLvl == "M1" ? colorStyle.white : colorStyle.primary}}>M1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>handlePress("M2")} style={{
                        ...buttonStyle.drawerHeaderButton,
                        marginHorizontal:"2%",
                        width:"30%",
                        backgroundColor: falseLvl == "M2" ? colorStyle.secondary : colorStyle.tertiary
                    }}>
                        <Text style={{...textStyle.drawerText,fontWeight:"bold",color:falseLvl == "M1" ? colorStyle.primary : colorStyle.white}}>M2</Text>
                    </TouchableOpacity>
            </View>
        )
    }

    function renderFooter(){
        return(
            <TouchableOpacity onPress={handleNext} style={{...buttonStyle.primaryButton,marginTop:"5%"}}>
                <Text style={textStyle.primaryText}>Suivant</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={containerStyle.safeAreaContainer}> 
            <Modal visible={showGroupe} animationType="slide">
                <TDModal  falseLvl={falseLvl} handleCreate={handleCreate} handleReturn={handleNext} allUE={allUE} />
            </Modal>
            <View style={{...containerStyle.drawerButtonContainer,justifyContent:"center",marginTop:"5%"}}>
                <Ionicons name="ios-school-outline" size={30} color={colorStyle.white} />
                    <Text style={{
                        ...textStyle.subtitle,
                        color:colorStyle.white,
                        fontSize:fontStyle.lessBig,
                        paddingTop:"2%",
                        paddingLeft:"5%"
                    }}>Sélectionner vos UE</Text>
            </View>
                
             {renderHeader()}
             <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={containerStyle.ueContainer}>
                    {allUEsorted[falseLvl].map((ue,index) => {
                        return renderUE(ue,index);
                    })}
                </View>
             </ScrollView>
             {renderFooter()}
         </SafeAreaView>
    )
}
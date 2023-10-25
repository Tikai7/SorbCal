import React, { useState,useEffect,useContext,useRef } from "react";
import { View, Text,TouchableOpacity, Modal } from "react-native";
import { containerStyle,buttonStyle,textStyle } from "../styles/mainstyle";
import { UserData } from "../context/contextData";
import LottieView from "lottie-react-native";
import UEModal from "./UEModal";
import UECalendar from "./UECalendar";

export default function PersonalCalendar() {
    const {myUE} = useContext(UserData)
    const [createModal,setCreateModal] = useState(false)

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

    function handleCreate(){
        setCreateModal((old) => !old)
    }

    return (
        <View style={containerStyle.emptyContainer}>
            <Modal animationType="slide" visible={createModal} >
                <UEModal handleCreate={handleCreate}/>
            </Modal>
            {!myUE?.length > 0 && <View style={containerStyle.parcoursContainer}>
                <Text style={textStyle.parcours}>Oops</Text>
            </View>}
            {!myUE?.length > 0 && <View style={{...containerStyle.textContainer,marginBottom:"-5%"}}>
                <Text style={textStyle.subtitle}>Vous n'avez aucun planning</Text>
            </View>}
            {!myUE?.length > 0 && <View>
                <LottieView 
                    ref={lottieRef}
                    source={require('../images/no_result.json')} 
                    autoPlay 
                    loop 
                    style={{width:350,height:350}}
                    renderMode={"SOFTWARE"}
                />
            </View>}
            {!myUE?.length > 0 && <TouchableOpacity onPress={handleCreate} style={buttonStyle.primaryButton}>
                <Text style={textStyle.primaryText}>Créer mon planning</Text>
            </TouchableOpacity>}
            
            {myUE?.length > 0 && 
                <UECalendar handleCreate={handleCreate}/>
            }

        </View>
    );
}

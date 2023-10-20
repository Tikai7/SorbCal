import { useState,useEffect } from 'react';
import { View, Text } from 'react-native';
import { getData } from '../server/Server';
import { WebView } from 'react-native-webview';

export default function Acceuil(){

    const [niveau,setNiveau] = useState('M1')
    const [parcours,setparcours] = useState('IMA')

    useEffect(()=>{
        async function getCalendar(){
            const path = `${parcours}/${niveau}_${parcours}/`
            await getData(path)
        }
        getCalendar()
    },[parcours,niveau])
 
    return (
        <View>
            <Text>Acceuil</Text>
        </View>
    );
}
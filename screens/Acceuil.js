import { useState,useEffect } from 'react';
import { View } from 'react-native';
import { getData } from '../server/Server';
import { containerStyle } from '../styles/mainstyle';
import AcceuilCalendar from '../components/AcceuilCalendar';
import AcceuilEmpty from '../components/AcceuilEmpty';
import { UserData } from '../context/contextData';

export default function Acceuil(){

    const [niveau,setNiveau] = useState('M1')
    const [parcours,setparcours] = useState('DAC')
    const [calendar,setCalendar] = useState([])


    useEffect(()=>{
        async function getCalendar(){
            const path = `${parcours}/${niveau}_${parcours}/`
            const [data,state] = await getData(path)
            setCalendar(data)
        }
        getCalendar()
    },[parcours,niveau])
 
    return (
        <UserData.Provider value={{niveau,setNiveau,parcours,setparcours}}>
        <View style={containerStyle.container}>
            {calendar.length > 0 ? <AcceuilCalendar calendar={calendar}/>: <AcceuilEmpty/>}
        </View>
        </UserData.Provider>
    );
}
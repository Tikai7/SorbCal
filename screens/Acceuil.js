import { useContext } from 'react';
import { View } from 'react-native';
import { containerStyle } from '../styles/mainstyle';
import AcceuilCalendar from '../components/AcceuilCalendar';
import AcceuilEmpty from '../components/AcceuilEmpty';
import { UserData } from '../context/contextData';

export default function Acceuil(){

    const {calendar} = useContext(UserData)
   
    return (
        <View style={containerStyle.container}>
            {calendar.length > 0 ? <AcceuilCalendar calendar={calendar}/> : <AcceuilEmpty/>}
        </View>
    );
}
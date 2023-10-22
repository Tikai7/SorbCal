import { useContext } from 'react';
import { View } from 'react-native';
import { containerStyle } from '../styles/mainstyle';
import AcceuilCalendar from '../components/AcceuilCalendar';
import AcceuilEmpty from '../components/AcceuilEmpty';
import { UserData } from '../context/contextData';
import Loading from '../components/Loading';

export default function Acceuil(){
    const {calendar,loading} = useContext(UserData)
    // if loading is true, display loading animation, else display the calendar or the empty screen
    return (
        <View style={containerStyle.container}>
            {loading ? <Loading/> : calendar.length > 0 ? <AcceuilCalendar calendar={calendar}/> : <AcceuilEmpty/>}
        </View>
    );
}
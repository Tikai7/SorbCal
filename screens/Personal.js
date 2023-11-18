import React from 'react';
import { View } from 'react-native';
import { useContext } from 'react';
import { UserData } from '../context/contextData';
import Loading from '../components/Loading';
import { containerStyle } from '../styles/mainstyle';
import AcceuilEmpty from '../components/AcceuilEmpty';
import PersonalCalendar from '../components/PersonalCalendar';

export default function Personal(){
    const {loading,myCalendar,myUE} = useContext(UserData)
    return (
        <View style={containerStyle.container}>
            {loading ? <Loading/> : (!(myCalendar.length > 0)  && myUE?.length >0) ? <AcceuilEmpty isPersonal={true}/> : <PersonalCalendar/>}
        </View>
    );
}
import React from 'react';
import { View,Text } from 'react-native';
import { useContext } from 'react';
import { UserData } from '../context/contextData';
import Loading from '../components/Loading';
import { containerStyle } from '../styles/mainstyle';
import AcceuilEmpty from '../components/AcceuilEmpty';
import PersonalCalendar from '../components/PersonalCalendar';

export default function Personal(){
    const {loading} = useContext(UserData)
    return (
        <View style={containerStyle.container}>
            {loading ? <Loading/> : true ? <PersonalCalendar/> : <AcceuilEmpty isPersonal={true}/>}
        </View>
    );
}
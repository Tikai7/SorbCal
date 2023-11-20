import React from 'react';
import { View } from 'react-native';
import { useContext,useState } from 'react';
import { UserData } from '../context/contextData';
import Loading from '../components/Loading';
import { containerStyle } from '../styles/mainstyle';
import AcceuilEmpty from '../components/AcceuilEmpty';
import PersonalCalendar from '../components/PersonalCalendar';

export default function Personal(){
    const {loading,myCalendar,myUE} = useContext(UserData)
    const [createModal,setCreateModal] = useState(false)
    
    function handleCreate() {
        setCreateModal((old) => !old)
    }

    return (
        <View style={containerStyle.container}>
            {loading ? <Loading/> : (!createModal && !(myCalendar.length > 0)  && myUE?.length >0) ? <AcceuilEmpty handleCreate={handleCreate} isPersonal={true}/> : <PersonalCalendar handleCreate={handleCreate} createModal={createModal}/>}
        </View>
    );
}
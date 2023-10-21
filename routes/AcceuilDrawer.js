import { createDrawerNavigator } from '@react-navigation/drawer';
import Acceuil from '../screens/Acceuil';
import AcceuilHeader from '../components/AcceuilHeader';
import CustomDrawer from '../components/CustomDrawer';
import { Dimensions } from 'react-native';
import { useState,useEffect } from 'react';
import { getData } from '../server/Server';
import { UserData } from '../context/contextData';

const screenWidth = Dimensions.get("window").width
const Drawer = createDrawerNavigator();

export default function AcceuilDrawer() {

    const [niveau,setNiveau] = useState('M1')
    const [parcours,setparcours] = useState('IMA')
    const [calendar,setCalendar] = useState([])
    const options = { header : (props) => <AcceuilHeader {...props} />}

    useEffect(()=>{
        async function getCalendar(){
            const path = `${parcours}/${niveau}_${parcours}/`
            const [data,state] = await getData(path)
            if (state)
                setCalendar(data)
        }
        getCalendar()
    },[parcours,niveau])

    return (
        <UserData.Provider value={{niveau,setNiveau,parcours,setparcours,calendar,setCalendar}}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{swipeEdgeWidth: screenWidth/2 }}
            >
                <Drawer.Screen name="Calendar" component={Acceuil} options={options} />
            </Drawer.Navigator>
        </UserData.Provider>
    );
}
import { createDrawerNavigator } from '@react-navigation/drawer';
import Acceuil from '../screens/Acceuil';
import AcceuilHeader from '../components/AcceuilHeader';
import CustomDrawer from '../components/CustomDrawer';
import { Dimensions } from 'react-native';
import { useState,useEffect } from 'react';
import { getData } from '../server/Server';
import { UserData } from '../context/contextData';
import CalendarTab from './CalendarTab';

const screenWidth = Dimensions.get("window").width
const Drawer = createDrawerNavigator();

export default function AcceuilDrawer() {

    const [niveau,setNiveau] = useState('M1')
    const [parcours,setparcours] = useState('IMA')
    const [calendar,setCalendar] = useState([])
    const [loading,setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [tm,setTm]=useState()
    const options = { header : () => null}

    useEffect(()=>{
        async function getCalendar(){
            let path = `${parcours}/${niveau}_${parcours}/`            
            
            // Only for special courses, because the API works differently
            if (parcours == "STL-INSTA"){
                path = "STL/M2_STL-INSTA/"
                setNiveau("M2")
            }
            else if (parcours == "DIGITAL")
                path =`RES/${niveau}_RES-EIT-Digital/`;
            else if (parcours == "RES-ESIEE-IT")
                path =`RES/${niveau}_RES-ITESCIA/`;
            else if (parcours == "MSI")
                path =`SFPN/${niveau}_SFPN-AFTI/`;
            
            // loading animation
            clearTimeout(tm)
            setLoading(true)
            const [data,state] = await getData(path)
            if (state)
                setCalendar(data)
            t = setTimeout(()=>{setLoading(false)},1000)
            setTm(t)
        }
        getCalendar()
    },[parcours,niveau,refreshing])

    return (
        <UserData.Provider value={{niveau,setNiveau,parcours,setparcours,calendar,setCalendar,loading,setLoading,refreshing,setRefreshing}}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{swipeEdgeWidth: screenWidth/2 }}
            >
                <Drawer.Screen name="Calendar" component={CalendarTab} options={options} />
            </Drawer.Navigator>
        </UserData.Provider>
    );
}
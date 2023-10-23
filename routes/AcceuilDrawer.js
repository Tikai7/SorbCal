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
    const [tempNiveau,setTempNiveau] = useState('M1')
    const [error,setError] = useState(false)
    const [parcours,setParcours] = useState('IMA')
    const [tempParcours,setTempParcours] = useState('IMA')
    const [calendar,setCalendar] = useState([])
    const [loading,setLoading] = useState(true)
    const [active,setActive] = useState("Acceuil")
    const [refreshing, setRefreshing] = useState(false);

    const options = { header : () => null}

    useEffect(()=>{
        async function getCalendar(){
            let path = `${parcours}/${niveau}_${parcours}/`            
            
            // Only for special courses, because the API works differently
            if (parcours === "STL-INSTA"){
                path = "STL/M2_STL-INSTA/"
                setNiveau("M2")
            }
            else if (parcours === "DIGITAL")
                path =`RES/${niveau}_RES-EIT-Digital/`;
            else if (parcours === "RES-ESIEE-IT")
                path =`RES/${niveau}_RES-ITESCIA/`;
            else if (parcours === "MSI")
                path =`SFPN/${niveau}_SFPN-AFTI/`;
            
            setLoading(true)
            const [data,state] = await getData(path)
            if (state){
                setError(false)
                setCalendar(data)
            }
            else{
                setError(true)
                setParcours(tempParcours)
                setNiveau(tempNiveau)
                console.log("Error while fetching data")
            }
            setLoading(false)
        }
        getCalendar()
    },[parcours,niveau,refreshing])

    return (
        <UserData.Provider value={{
            niveau,setNiveau,
            parcours,setParcours,
            calendar,setCalendar,
            loading,setLoading,
            refreshing,setRefreshing,
            active,setActive,
            error,setError,
            tempParcours,setTempParcours,
            tempNiveau,setTempNiveau
        }}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{swipeEdgeWidth: Math.floor(screenWidth/3) }}
            >
                <Drawer.Screen name="Calendar" component={CalendarTab} options={options} />
            </Drawer.Navigator>
        </UserData.Provider>
    );
}
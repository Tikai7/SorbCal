import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import { useState,useEffect } from 'react';
import { getData } from '../server/Server';
import { UserData } from '../context/contextData';
import CalendarTab from './CalendarTab';
import { getParcoursOfMyUE } from '../utils/AllParcours';

const Drawer = createDrawerNavigator();

export default function AcceuilDrawer({}) {

    const [niveau,setNiveau] = useState('M1')
    const [tempNiveau,setTempNiveau] = useState('M1')
    const [error,setError] = useState(false)
    const [parcours,setParcours] = useState('IMA')
    const [tempParcours,setTempParcours] = useState('IMA')
    const [calendar,setCalendar] = useState([])
    const [loading,setLoading] = useState(true)
    const [active,setActive] = useState("Acceuil")
    const [refreshing, setRefreshing] = useState(false);
    const [myUE,setMyUE] = useState([])
    const [myLVL,setMyLVL] = useState("M1")
    const [myCalendar,setMyCalendar] = useState([])
    const options = { header : () => null}

    useEffect(()=>{

        async function getMyCalendar(){
            console.log("[INFO] Getting my calendar")
            const tempCalendar = []
            const myParcours = getParcoursOfMyUE(myUE,myLVL)
            setLoading(true)
            for (const parcour of myParcours){
                let path = `${parcour}/${myLVL}_${parcour}/`            
                // Only for special courses, because the API works differently
                if (parcour === "STL-INSTA"){
                    path = "STL/M2_STL-INSTA/"
                    setMyLVL("M2")
                }
                else if (parcour === "DIGITAL")
                    path =`RES/${myLVL}_RES-EIT-Digital/`;
                else if (parcour === "RES-ESIEE-IT")
                    path =`RES/${myLVL}_RES-ITESCIA/`;
                else if (parcour === "MSI")
                    path =`SFPN/${myLVL}_SFPN-AFTI/`;
                
                const [data,state] = await getData(path,myUE)
                if (state)
                    tempCalendar.push(...data)
                else
                    console.log("Error while fetching data")
                
            }
            setMyCalendar([...tempCalendar])
            setLoading(false)
        }

        async function getCalendar(){
            console.log("[INFO] Getting calendar")
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

        if (myUE.length > 0 && active !== "Acceuil")
            getMyCalendar()
        else
            getCalendar()


    },[parcours,niveau,refreshing,myUE])

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
            tempNiveau,setTempNiveau,
            myUE,setMyUE,
            myLVL,setMyLVL,
            myCalendar,setMyCalendar,
        }}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name="Calendar" component={CalendarTab} options={options} />
            </Drawer.Navigator>
        </UserData.Provider>
    );
}
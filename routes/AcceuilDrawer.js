import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import { useState,useEffect,useRef } from 'react';
import { getData } from '../server/Server';
import { UserData } from '../context/contextData';
import CalendarTab from './CalendarTab';
import { getParcoursOfMyUE } from '../utils/AllParcours';
import { clearAll, getMyData } from '../utils/Functions';

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
    const [myGroups,setMyGroups] = useState({})
    const [offset,setOffset] = useState(0)
    const [currentDate,setCurrentDate] = useState(new Date())

    const options = { header : () => null}

    const refreshCond = useRef(refreshing);
    const parcourCond = useRef(parcours);
    const niveauCond = useRef(niveau);
    const offsetCond = useRef(offset);
    
    useEffect(()=>{
        async function getMyCalendar(ues,lvl,grp){
            console.log("[INFO] Getting my calendar")
            let cpt = 0
            while (ues === null || lvl === null || grp === null){
                ues = myUE
                lvl = myLVL
                grp = myGroups
                cpt++
                if (cpt >1)
                    return;
            }

            const tempCalendar = []
            const myParcours = getParcoursOfMyUE(ues,lvl)
            setLoading(true)
            for (const parcour of myParcours){
                let path = `${parcour}/${lvl}_${parcour}/`            
                // Only for special courses, because the API works differently
                if (parcour === "STL-INSTA"){
                    path = "STL/M2_STL-INSTA/"
                    setMyLVL("M2")
                }
                else if (parcour === "DIGITAL")
                    path =`RES/${lvl}_RES-EIT-Digital/`;
                else if (parcour === "RES-ESIEE-IT")
                    path =`RES/${lvl}_RES-ITESCIA/`;
                else if (parcour === "MSI")
                    path =`SFPN/${lvl}_SFPN-AFTI/`;
                
                const [data,state] = await getData(path,ues,grp,offset)
                if (state)
                    tempCalendar.push(...data)
                else
                    console.log("Error while fetching data")
                
            }
            tempCalendar.sort((a,b)=>{return new Date(a.dtstart.value) - new Date(b.dtstart.value)})

            let uniqueEvents = [];
            const filteredData = tempCalendar.filter(item => {
                if (!uniqueEvents.includes(item.summary.value)) {
                    uniqueEvents.push(item.summary.value);
                    return true;
                }
                return false;
            });

            setMyCalendar([...filteredData])
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

        async function verifyIfIcan(){
            // await clearAll()
            const ues = await getMyData("myUE")
            const lvl = await getMyData("myLVL")
            const grp = await getMyData("myGroups")

            setMyUE(ues)
            setMyLVL(lvl)
            setMyGroups(grp)

            reseachCond = (parcourCond.current !== parcours || niveauCond.current !== niveau || refreshCond.current !== refreshing)
            personalCond = (refreshCond.current !== refreshing || offsetCond.current !== offset)
            
            if (active === "Acceuil"){
                if (calendar.length === 0 || reseachCond) {
                    await getCalendar()
                    refreshCond.current = refreshing;
                    parcourCond.current = parcours;
                    niveauCond.current = niveau;
                    offsetCond.current = offset;
                }
                return;
            }

            if ((active !== "Acceuil" && myCalendar.length === 0) || personalCond)
                await getMyCalendar(ues,lvl,grp,offset)

            refreshCond.current = refreshing;
            parcourCond.current = parcours;
            niveauCond.current = niveau;
            offsetCond.current = offset;
        }

        verifyIfIcan()
    },[parcours,niveau,refreshing,active,offset])

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
            myGroups,setMyGroups,
            offset,setOffset,
            currentDate,setCurrentDate
        }}>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen name="Calendar" component={CalendarTab} options={options} />
            </Drawer.Navigator>
        </UserData.Provider>
    );
}

import { createDrawerNavigator } from '@react-navigation/drawer';
import PersonalCalendar from '../components/PersonalCalendar';
import Acceuil from '../screens/Acceuil';
import AcceuilHeader from '../components/AcceuilHeader';
import { Dimensions } from 'react-native';
import CustomPersonalDrawer from '../components/CustomPersonalDrawer';

const screenWidth = Dimensions.get("window").width
const Drawer = createDrawerNavigator();

export default function CalendarDrawer() {
    const options = { header : (props) => <AcceuilHeader {...props} />}

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomPersonalDrawer {...props} />}
            screenOptions={{swipeEdgeWidth: screenWidth/2,drawerPosition:"right" }}
        >
            <Drawer.Screen name="Acceuil" component={Acceuil} options={options}/>
            <Drawer.Screen name="PersonalCalendar" component={PersonalCalendar}  options={options}/>

        </Drawer.Navigator>
    );
}
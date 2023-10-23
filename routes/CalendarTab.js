
import Personal from '../screens/Personal';
import Acceuil from '../screens/Acceuil';
import AcceuilHeader from '../components/AcceuilHeader';
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTab from '../components/CustomTab';

const Tab = createBottomTabNavigator();

export default function CalendarTab() {
    const options = { header : (props) => <AcceuilHeader {...props} />}

    return (
        <Tab.Navigator tabBar={(props) => <CustomTab {...props} />}>
            <Tab.Screen name="Acceuil" component={Acceuil} options={options}/>
            <Tab.Screen name="Personal" component={Personal}  options={options}/>
        </Tab.Navigator>
    );
}
import { createDrawerNavigator } from '@react-navigation/drawer';
import Acceuil from '../screens/Acceuil';
import AcceuilHeader from '../components/AcceuilHeader';

const Drawer = createDrawerNavigator();

export default function AcceuilDrawer() {
    const options = {
        header : (props) => <AcceuilHeader {...props} />
    }
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Calendar" component={Acceuil} options={options} />
        </Drawer.Navigator>
    );
}
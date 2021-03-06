import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import AppScreens from './AppScreens';
import BrowseScreen from '../screens/BrowseScreen';
import HelpDrawer from './HelpDrawer';
import Contact from './Contact';

import CustomDrawerContentComponent from '../components/DrawerCustomization';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppScreens,
    },
    Help: {
        screen: HelpDrawer,
    },
    Contact: {
        screen: Contact,
    }}, {
        initialRouteName: 'Home',
        contentComponent: CustomDrawerContentComponent,
        drawerBackgroundColor: '#2f3b52',
        contentOptions: {
            activeTintColor: '#232c40',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#e6e6e6',
            labelStyle: { fontSize: 17 },
            itemsContainerStyle: {
                marginTop: 10
            }
        }
        
    });

export default createAppContainer(RootDrawerNavigator);
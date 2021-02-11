import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import AppScreens from './AppScreens';
import HelpDrawer from './HelpDrawer';

const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppScreens,
    },
    Help: {
        screen: HelpDrawer,
    }}, {
        drawerBackgroundColor: '#2f3b52'
    });

export default createAppContainer(RootDrawerNavigator);
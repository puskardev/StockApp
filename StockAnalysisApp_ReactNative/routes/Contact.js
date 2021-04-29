import React from 'react';
import { createStackNavigator } from "react-navigation-stack";

import ContactScreen from '../screens/ContactScreen';
import Header from '../components/header';

const screens = {
    ContactScreen: {
        screen: ContactScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />
            }
        }
    }
};

const HelpDrawer = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: 'white',
        headerStyle: { 
            backgroundColor: '#232c40',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            height: 90
        }
    }
});

export default HelpDrawer;

import React from 'react';
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from '../screens/LoginScreen';
import HomePage from '../screens/HomePage';
import BrowseScreen from '../screens/BrowseScreen';
import StockScreen from '../screens/StockScreen';
import Header from '../components/header';

const screens = {
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            title: ''
        }
    },
    HomePage: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={ navigation } />,
                headerLeft: null
            }
        }
    },
    BrowseScreen: {
        screen: BrowseScreen,
        navigationOptions: {
            title: 'Browse'
        }
    },
    StockScreen: {
        screen: StockScreen,
        navigationOptions: {
            title: 'Stock Information'
        }
    },
}

const AppScreens = createStackNavigator(screens, {
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

export default AppScreens;

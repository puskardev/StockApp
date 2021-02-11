import React from 'react';
import { createStackNavigator } from "react-navigation-stack";

import HomePage from '../screens/HomePage';
import BrowseScreen from '../screens/BrowseScreen';
import StockScreen from '../screens/StockScreen';
import Header from '../shared/header';

const screens = {
    HomePage: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={ navigation } />
                //title: 'Home'
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

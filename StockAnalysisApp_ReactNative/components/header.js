import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

export default function Header({ navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <Image style={styles.MoonLogo} resizeMode='contain' source={ require("../assets/Moon.png") } />
            <MaterialIcons name='menu' size={35} onPress={openMenu} style={ styles.icon } />
            {/* <FontAwesomeIcon icon={ faMoon } color={'white'} size={40} style={ styles.headerText } /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#232c40',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
    },
    icon: {
        right: 160,
        color: 'rgba(255, 255, 255, .8)',
    },
    MoonLogo: {
        height: '140%',
        position: 'absolute',
    }
});
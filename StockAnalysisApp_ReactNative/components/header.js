import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';

export default function Header({ navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={35} onPress={openMenu} style={styles.icon} />
            <FontAwesomeIcon icon={ faCommentsDollar } color={'white'} size={40} style={styles.headerText} />
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
        borderBottomWidth: 0,
    },
    headerText: {
        position: 'absolute'
    },
    icon: {
        right: 160,
        color: 'rgba(255, 255, 255, .8)'
    }
});
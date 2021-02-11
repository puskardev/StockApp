import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='menu' size={35} onPress={openMenu} style={styles.icon} />
            <Text style={styles.headerText}>Home</Text>
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
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        letterSpacing: 1,
        position: 'absolute'
    },
    icon: {
        right: 160,
        color: 'rgba(255, 255, 255, .8)'
    }
});
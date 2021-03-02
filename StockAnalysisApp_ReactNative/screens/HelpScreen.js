import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const HelpScreen = props => {
    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <Text style={styles.header}>Help:</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
        marginTop: 10
    }
})

export default HelpScreen;
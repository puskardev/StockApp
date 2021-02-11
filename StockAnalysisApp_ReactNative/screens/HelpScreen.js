import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

const HelpScreen = props => {
    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <Text></Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    SearchBar: {
        margin: 10,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        backgroundColor:'#E1E1E1',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDCDC',  
        color: 'black', 
        overflow: 'hidden'
    }
})

export default HelpScreen;
import React from 'react';
import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native';

const BrowseScreen = props => {
    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <TextInput style={styles.SearchBar} placeholder='Search...'></TextInput>
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

export default BrowseScreen;
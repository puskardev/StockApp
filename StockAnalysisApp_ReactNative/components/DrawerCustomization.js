import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import fire from "../src/firebase/config";

//class CustomDrawerContentComponent extends Component {
const CustomDrawerContentComponent = props => {

    const pressHandlerLogout = () => {
        fire
            .auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                props.navigation.navigate('LoginScreen')
            })
    };
    
    //render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={styles.container} >
                    <Image style={styles.MoonLogo} resizeMode='contain' source={ require("../assets/MoonLogo.png") } />
                    <DrawerItems {...props} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('BrowseScreen')} style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 15, marginTop: 5 }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20, marginTop: 5 }}>Browse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pressHandlerLogout} style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 15, marginTop: 5 }}>
                        <FontAwesomeIcon icon={ faSignOutAlt } color={'white'} size={20} />
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        );
    //}
}   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '12%'
    },
    MoonLogo: {
        width: '75%', 
        height: '15%', 
        marginLeft: 35, 
        marginTop: 10
    }
})

export default CustomDrawerContentComponent;
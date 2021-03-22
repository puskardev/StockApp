import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar } from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class CustomDrawerContentComponent extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

                <ScrollView>
                    <SafeAreaView
                        style={styles.container}
                        //forceInset={{ top: 'always', horizontal: 'never' }}
                    >
                        <View style={[ styles.containHeader, { backgroundColor: '#2f3b52' } ]}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
                                    <Text style={{ color: '#f9f9f9', marginTop: '3%' }}>Hi, [name]</Text>
                                    <Text style={{ color: '#f9f9f9' }}>[email]</Text>
                            </View>
                        </View>
                        <DrawerItems {...this.props} />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 15, marginTop: 5 }}>
                            <FontAwesomeIcon icon={ faSignOutAlt } color={'white'} size={20} />
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>Logout</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>

            </View>
        );
    }
}   

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containHeader: {
        marginTop: '20%'
    }
})

export default CustomDrawerContentComponent;
import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView, Modal, Pressable, Linking } from 'react-native';

// front end code for displaying contact us screen
const ContactScreen = props => {

    loadFeedbackFormInBrowser = () => {
        Linking.openURL('https://forms.gle/BhTwGukUS4eeSYV97').catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <ScrollView>
                <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 40 }}>
                    <Text style={styles.header}>Developers:</Text>
                    <Text style={styles.text}>Puskar Dev: puskar.dev@mavs.uta.edu</Text>
                    <Text style={styles.text}>Hannah Nguyen: hannah.nguyen3@mavs.uta.edu</Text>
                    <Text style={styles.text}>Safi Ullah: safi.ullah@mavs.uta.edu</Text>

                    <Text style={styles.header}>Google Feedback Form:</Text>
                    <Text style={{ color: 'white', marginTop: 5, fontSize: 15, textDecorationLine: 'underline' }} onPress={loadFeedbackFormInBrowser}>Click here to view the form!</Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 35,
        marginBottom: 10
    },
    text: {
        color: 'white',
        marginTop: 5,
        fontSize: 15,
        marginBottom: 5
    },
    ModalContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20
      },
      ModalBackground: {
        margin: 20, 
        backgroundColor: '#2f3b52', 
        borderRadius: 20, 
        padding: 35, 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: {width: 0, height: 2}, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5
      }
})

export default ContactScreen;
import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView, Modal, Pressable, Linking } from 'react-native';

const HelpScreen = props => {

    const [termsModalVisisble, setTermsModalVisible] = useState(false);

    loadFeedbackFormInBrowser = () => {
        Linking.openURL('https://forms.gle/BhTwGukUS4eeSYV97').catch(err => console.error("Couldn't load page", err));
    };

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <ScrollView>

                <Modal animationType="slide" transparent={true} visible={termsModalVisisble} onRequestClose={() => {setTermsModalVisible(!termsModalVisisble); }}>
                    <View style={styles.ModalContainer}>
                        <View style={styles.ModalBackground}>
                            <Text style={{ marginBottom: 15, color: 'white', fontWeight: 'bold', fontSize: 25, alignSelf: 'center' }}>Risk Disclosures</Text>
                            <Text style={{ marginBottom: 15, color: 'white', fontSize: 17 }}>
                                All investments involve risks, including the loss of principal. 
                                The past performance of a security or financial product does not guarantee future results or returns. 
                                Users should consider their investment objectives and risks carefully before investing in securities.
                                The price of a given security may increase or decrease based on market conditions and users may lose money, including their original investment. 
                                Moon is meant for informational purposes only and is not intended to serve as a recommendation to a user to buy, hold or sell any security or any other asset.
                            </Text>
                            <Pressable style={{ backgroundColor: 'white', borderRadius: 20, padding: 10, elevation: 2 }} onPress={() => setTermsModalVisible(!termsModalVisisble)}>
                                <Text style={{ color: '#232d41', fontWeight: 'bold' }}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <View style={{ marginLeft: 40, marginRight: 30, marginBottom: 40 }}>
                    <Text style={styles.header}>What is Moon?</Text>
                    <Text style={styles.text}>Moon is an app that assists users in analyzing their stocks.</Text>

                    <Text style={styles.header}>How does Moon analyze stocks?</Text>
                    <Text style={styles.text}>Moon utilizes news articles, social media posts, and various APIs to determine a sentiment analysis.</Text>

                    {/* 
                    <Text style={styles.header}>How do I view a stock of my choosing on Moon?</Text>
                    <Text style={styles.text}>
                        Upon first logging into your account, you will see a list. 
                        (The default name of this list is "My Stocks", but can be changed if a different list name is preferred.) 
                        At the end of this list will be a button entitled "+ Add Stock to List".
                        Clicking this button will bring you to a Browse page, where you can browse for any stock you'd like.
                    </Text>
                    */}
                    
                    <Text style={styles.header}>What is "My Stocks" on the homepage?</Text>
                    <Text style={styles.text}>
                        Moon allows users to make their own list of stocks to keep track of within the app.
                        Upon first creating an account and opening the app, the "My Stock" list will be empty.
                        Click on the "+ Add Stock to List" button below the list and browse for any stock of your choice.
                        When you find a stock you'd like to add to your list, click the plus (+) button on the right.
                        When you get back to the homepage, your stock will be added to the list.
                        Add as many stocks as you'd like to your list. 
                        The next time you log back into the app, your list will be saved just as you left it!
                    </Text>

                    <Text style={styles.header}>What are Moon's risk disclosures?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>Our risk disclosures can be viewed </Text>
                        <Text style={{ color: 'white', marginTop: 5, textDecorationLine: 'underline' }} onPress={() => setTermsModalVisible(!termsModalVisisble)}>here</Text>
                        <Text style={styles.text}>.</Text>
                    </View>

                    <Text style={styles.header}>Have any feedback for us?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.text}>Let us know what you think through </Text>
                        <Text style={{ color: 'white', marginTop: 5, textDecorationLine: 'underline' }} onPress={loadFeedbackFormInBrowser}>this form</Text>
                        <Text style={styles.text}>!</Text>
                    </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 35,
        marginLeft: -15
    },
    text: {
        color: 'white',
        marginTop: 5
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

export default HelpScreen;
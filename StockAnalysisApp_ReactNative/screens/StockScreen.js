import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, ImageBackground } from 'react-native';

export default function StockScreen({ navigation }) {
    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <ScrollView>
                <Text style={styles.SymbolText}>{ navigation.getParam('symbol') }</Text>
                <View style={styles.headerContainer}>
                    <Text style={styles.NameText}>{ navigation.getParam('name') }</Text>
                    <Text style={styles.MarketValueText}>${ navigation.getParam('value') }</Text>
                </View>
                <Image
                    resizeMode= 'contain'
                    style={styles.image}
                    source={ navigation.getParam('status')==='up' ? require("../assets/GreenTrendline.png") : require("../assets/RedTrendline.png")}
                /> 
                <Text style={styles.AnalysisHeader}>Based on our Analysis:</Text>
                <Text style={styles.AnalysisText}>We suggest to { navigation.getParam('analysis') } this stock.</Text>

                {/* temporary placeholder for analysis description */}
                <Text style={{ color: 'white', marginLeft: 10, paddingLeft: 10 }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
                <Text style={{ color: 'white', marginLeft: 10, paddingLeft: 10 }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
                <Text style={{ color: 'white', marginLeft: 10, paddingLeft: 10 }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
                <Text style={{ color: 'white', marginLeft: 10, paddingLeft: 10 }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
                <Text style={{ color: 'white', marginLeft: 10, paddingLeft: 10 }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>
                <Text style={{ color: 'white', marginLeft: 10, paddingLeft: 10 }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Text>

                <Text style={styles.AnalysisHeader}>News</Text>

                {/* temporary placeholder for news articles */}
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}></Text>
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}></Text>
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}></Text>
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}></Text>

            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        justifyContent: 'flex-start'
      },
    headerContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    SymbolText: {
        padding: 5,
        color: 'white'
    },
    NameText: {
        flex: 2,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    MarketValueText: {
        flex: 1,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    image: {
        width: '100%',
        marginTop: 10,
        backgroundColor: '#2f3b52'
    },
    AnalysisHeader: {
        color: 'white',
        fontWeight: 'bold', 
        fontSize: 25, 
        marginLeft: 10,
        marginTop: 30
    },
    AnalysisText: {
        color: 'white',
        padding: 10, 
        marginLeft: 10, 
        fontSize: 15
    }
})
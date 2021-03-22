import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function StockScreen({ navigation }) {
    const [selectedValue, setSelectedValue] = useState('Monday')

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

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>High value: ${ navigation.getParam('highValue') }</Text>
                    <Text style={styles.HighLowValueText}>Low value: ${ navigation.getParam('lowValue') }</Text>
                </View>

                {/* Analysis: */}
                <Text style={styles.AnalysisHeader}>Based on our Analysis:</Text>
                <Text style={styles.AnalysisText}>We predict that this stock will go { navigation.getParam('status') } in the future.</Text>

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
    DateText: {
        backgroundColor: '#2f3b52', 
        color: 'white', 
        marginLeft: 10, 
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2f3b52', 
        overflow: 'hidden',
        textAlign: 'center',
    },
    HighLowValueContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 25,
        justifyContent: 'space-between'
    },  
    HighLowValueText: {
        color: 'white',
        fontWeight: 'bold'
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
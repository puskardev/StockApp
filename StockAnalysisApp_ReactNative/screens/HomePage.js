import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

export default function HomePage({ navigation }) {

    // temporary placeholder stocks:
    const [stocks, setStocks] = useState([
        { symbol: 'TSLA', name: 'Tesla', value: 853.33, analysis: 'keep', status: 'up' },
        { symbol: 'AAPL', name: 'Apple', value: 136.68, analysis: 'sell', status: 'down' },
        { symbol: 'MSFT', name: 'Microsoft', value: 242.02, analysis: 'keep', status: 'up' },
        { symbol: 'AMZN', name: 'Amazon', value: 3317.75, analysis: 'keep', status: 'up' },
        { symbol: 'FB', name: 'Facebook', value: 266.04, analysis: 'sell', status: 'down' },
    ]);
    const [watchStocks, setWatchStocks] = useState([
        { symbol: 'GME', name: 'Gamestop', value: 66.52, analysis: 'not invest in', status: 'down' },
        { symbol: 'NVDA', name: 'Nvidia', value: 544.01, analysis: 'invest in', status: 'up' },
        { symbol: 'SQ', name: 'Square', value: 259.05, analysis: 'invest in', status: 'up' },
        { symbol: 'AMC', name: 'AMC Entertainment', value: 6.07, analysis: 'not invest in', status: 'down' },
    ]);


    const pressHandlerBrowseScreen = () => {
        navigation.navigate('BrowseScreen');
    }

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <ScrollView>
                <Text style={{ color: 'white', fontSize: 15 }}>Welcome Back, [name]</Text>
                <View style={styles.ListContainer}>
                    <Text style={styles.ListHeader}>My Stocks</Text>
                    <FlatList 
                        data={stocks}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('StockScreen', item)}>
                                    <View style={styles.StockContainer}>
                                        <Text style={styles.StockText}>{ item.symbol }</Text>
                                        <Image style={{flex: 2}}
                                            resizeMode= 'contain'
                                            style={styles.image}
                                            source={ item.status==='up' ? require("../assets/GreenTrendline.png") : require("../assets/RedTrendline.png") }
                                        />
                                        <Text style={ item.status==='up' ? styles.MarketValueGreen : styles.MarketValueRed }>${ item.value }</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.divider}/>
                            </View>
                        )}
                    />
                    <TouchableOpacity onPress={pressHandlerBrowseScreen}>
                        <Text style={styles.AddStockText}>+ Add Stock To List</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.ListContainer}>
                    <Text style={styles.ListHeader}>Watch List</Text>
                    <FlatList 
                        data={watchStocks}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('StockScreen', item)}>
                                    <View style={styles.StockContainer}>
                                        <Text style={styles.StockText}>{ item.symbol }</Text>
                                        <Image
                                            resizeMode= 'contain'
                                            style={styles.image}
                                            source={ item.status==='up' ? require("../assets/GreenTrendline.png") : require("../assets/RedTrendline.png") }
                                        />
                                        <Text style={ item.status==='up' ? styles.MarketValueGreen : styles.MarketValueRed }>${ item.value }</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.divider}/>
                            </View>
                        )}
                    />
                    <TouchableOpacity onPress={pressHandlerBrowseScreen}>
                        <Text style={styles.AddStockText}>+ Add Stock To List</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15,
      },
      ListContainer: {
        marginTop: 20,
        marginLeft: 5,
      },
      ListHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
      },
      StockContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        height: 60,
        alignItems: 'center'
      },
      StockText: {
        flex: .5,
        color: 'white',
        fontSize: 16,
        marginLeft: 5
      },
      image: {
        flex: 1.5,
        height: '140%',
        width: '100%',
        marginLeft: 20,
        marginRight: 20
      },
      MarketValueGreen: {
        flex: .8,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'#5ABB54',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5ABB54',  
        color: 'white', 
        overflow: 'hidden',
        textAlign: 'center',
      }, 
      MarketValueRed: {
        flex: .8,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'#EB5A5A',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EB5A5A',  
        color: 'white', 
        overflow: 'hidden',
        textAlign: 'center',
      },
      AddStockText: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#B2B2B2'
      },
      divider: {
        borderColor: 'rgba(255, 255, 255, .1)', 
        borderWidth: 1
      }
});

import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import Header from '../components/header';

export default function HomePage({ navigation }) {

    // temporary placeholder stocks:
    const [stocks, setStocks] = useState([
        { symbol: 'TSLA', name: 'Tesla', value: 802.31, highValue: 807.25, lowValue: 785.33, status: 'up' },
        { symbol: 'AAPL', name: 'Apple', value: 134.48, highValue: 134.85, lowValue: 133.69, status: 'down' },
        { symbol: 'MSFT', name: 'Microsoft', value: 244.42, highValue: 244.89, lowValue: 242.74, status: 'up' },
        { symbol: 'AMZN', name: 'Amazon', value: 3257.71, highValue: 3261.01, lowValue: 3233.31, status: 'up' },
        { symbol: 'FB', name: 'Facebook', value: 269.02, highValue: 271.18, lowValue: 268.34, status: 'down' },
    ]);
    const [trendingStocks, setTrendingStocks] = useState([
        { symbol: 'AMC', name: 'AMC Entertainment', value: 10.51, highValue: 11.25, lowValue: 9.72, status: 'up' },
        { symbol: 'RBLX', name: 'Roblox', value: 71.15, highValue: 72.86, lowValue: 68.56, status: 'up' },
        { symbol: 'CCL', name: 'Carnival', value: 28.04, highValue: 28.73, lowValue: 27.70, status: 'up' },
        { symbol: 'TSLA', name: 'Tesla', value: 692.52, highValue: 708.16, lowValue: 684.70, status: 'up' },
    ]);


    const pressHandlerBrowseScreen = () => {
        navigation.navigate('BrowseScreen');
    }

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <ScrollView>
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
                    <Text style={styles.ListHeader}>Trending Stocks</Text>
                    <FlatList 
                        data={trendingStocks}
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
                </View>

                {/*
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 5 }}>
                        <FontAwesomeIcon icon={ faPlusSquare } color={ '#DEDEDE' } size={ 30 } />
                        <Text style={{ color: '#DEDEDE', fontWeight: 'bold', fontSize: 25, marginLeft: 10 }}>Add New List</Text>
                </TouchableOpacity>
                */ }

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
        marginTop: 5,
        marginBottom: 20,
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

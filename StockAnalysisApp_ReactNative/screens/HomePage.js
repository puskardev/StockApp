import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

import Header from '../components/header';
import fire from "../src/firebase/config";

var url = "http://192.168.0.37:5000/trending";

export default function HomePage({ navigation }) {

    var Email = navigation.getParam("Email");

    var mystocks = 1;
    var allstocks = 1;

    const starCountRef = fire.database().ref("Users/MyStocks");
    starCountRef.on("value", (snapshot) => {
      mystocks = snapshot.val();
    });
  
    /*
    var trendingStocks = 1;
    const starCountRef1 = fire.database().ref("Stocks/TrendingStocks");
  
    starCountRef1.on("value", (snapshot) => {
      trendingStocks = snapshot.val();
    });
    */
  
    const pressHandlerBrowseScreen = () => {
      navigation.navigate("BrowseScreen", { Email: Email });
    };    

    const [trendingStocks, setTrendingStocks] = useState([]);
    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => setTrendingStocks(json.trends))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <ScrollView>
                <View style={styles.ListContainer}>
                    <Text style={styles.ListHeader}>My Stocks</Text>
                    <FlatList 
                        data={mystocks}
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
                                        <Text style={ item.status==='up' ? styles.MarketValueGreen : styles.MarketValueRed }>${ item.price }</Text>
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

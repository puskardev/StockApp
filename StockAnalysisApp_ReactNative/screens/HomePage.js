import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/header';
import fire from "../src/firebase/config";

var url = "http://192.168.0.37:5000/trending";

// front end code for displaying homepage screen
// Accesses firebase to display lists and accesses server calls to display trending stocks
export default function HomePage({ navigation }) {

    var Email = navigation.getParam("Email");

    var mystocks = 1;
    var allstocks = 1;

    // gets user's "My Stocks" list from firebase
    const starCountRef = fire.database().ref("Users/MyStocks");
    starCountRef.on("value", (snapshot) => {
      mystocks = snapshot.val();
    });
  
    // press handler to bring user to Browse Screen
    const pressHandlerBrowseScreen = () => {
      navigation.navigate("BrowseScreen", { Email: Email });
    };    

    // gets Trending Stocks from API
    const [trendingStocks, setTrendingStocks] = useState([]);
    useEffect(() => {
        fetch(url)
          .then((response) => response.json())
          .then((json) => setTrendingStocks(json.trends))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
    }, []);

    // handles deleting a stock in the list
    const deleteStock = () => {
        const deleteRef = fire.database().ref('Users/MyStocks/6');
        deleteRef.remove()
    }

    const [edit, setEdit] = useState(false);

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
                                        <Text style={ item.status==='up' ? styles.MarketValueGreen : styles.MarketValueRed }>${ item.price }</Text>

                                        {edit ? (
                                        <TouchableOpacity>
                                            <FontAwesomeIcon icon={ faTrash } color={'white'} size={25} style={{ marginLeft: 20 }} onPress={deleteStock} />
                                        </TouchableOpacity>
                                        ) : null}
                                    </View>
                                </TouchableOpacity>
                                
                                <View style={styles.divider}/>
                            </View>
                        )}
                        style = {{ marginBottom: 15 }}
                    />
                    <TouchableOpacity onPress={pressHandlerBrowseScreen}>
                        <Text style={styles.AddStockText}>+ Add Stock To List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setEdit(!edit)}>

                        {edit ? (
                            <Text style={styles.EditList}>Exit Editing</Text>
                        ) : <Text style={styles.EditList}>Edit List</Text>}
                        
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
        marginTop: 10,
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#B2B2B2'
      },
      EditList: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 8,
        backgroundColor: '#858585',
        borderColor: '#858585',
        borderRadius: 15,
        borderWidth: 1,
        marginHorizontal: 125,
        paddingTop: 5,
        paddingBottom: 5,
        overflow: 'hidden',
      },   
      divider: {
        borderColor: 'rgba(255, 255, 255, .1)', 
        borderWidth: 1
      }
});

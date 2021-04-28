import React from 'react';
import fire from "../src/firebase/config";
import { View, StyleSheet, Text, TextInput, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';

var trendingStocks = 1;
var allStocks = 1;

export default function BrowseScreen({navigation}) {

    var Email = navigation.getParam("Email");
    var myStocks = 1;

    const starCountRef3 = fire.database().ref("Stocks/AllStocks");
    starCountRef3.on("value", (snapshot) => {
        allStocks = snapshot.val();
    });

    var starCountRef4 = fire.database().ref("Users/MyStocks");
    starCountRef4.on("value", (snapshot) => {
        myStocks = snapshot.val();
    });

    const pressHandlerBrowse = (el) => {
        navigation.navigate("HomePage", { Email: Email });
        if(myStocks.some((myStocks) => myStocks["symbol"] === el.symbol)) {
            fire.database().ref("Users").set({
                MyStocks: myStocks,
            });
        } else {
            myStocks.push(el);
            fire.database().ref("Users").set({
                MyStocks: myStocks,
            });
        }
    };

    return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <TextInput style={styles.SearchBar} placeholder='Search...'></TextInput>

            <FlatList 
                data={allStocks}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => pressHandlerBrowse(item)}>
                        <View>
                            <View style={styles.StockContainer}>
                                <Text style={styles.StockText}>{item.symbol}</Text>
                            </View>
                            <View style={styles.divider}/>
                        </View>
                    </TouchableOpacity>
                )} 
            />

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    SearchBar: {
        margin: 10,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 15,
        backgroundColor:'#E1E1E1',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DCDCDC',  
        color: 'black', 
        overflow: 'hidden'
    },
    StockContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        height: 60,
        alignItems: "center",
    },
    StockText: {
        flex: 0.5,
        color: "white",
        fontSize: 16,
        marginLeft: 5,
    },
    divider: {
        borderColor: "rgba(255, 255, 255, .1)",
        borderWidth: 1,
    },
})
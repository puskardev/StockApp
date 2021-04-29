import React from 'react';
import fire from "../src/firebase/config";
import { View, StyleSheet, Text, TextInput, ImageBackground, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

var trendingStocks = 1;
var allStocks = 1;

// front end code for displaying Browse screen and adding stocks to the My Stocks list
export default function BrowseScreen({navigation}) {

    var Email = navigation.getParam("Email");
    var myStocks = 1;

    // gets "All Stocks" list from firebase
    const starCountRef3 = fire.database().ref("Stocks/AllStocks");
    starCountRef3.on("value", (snapshot) => {
        allStocks = snapshot.val();
    });

    // gets "My Stocks" list from firebase
    var starCountRef4 = fire.database().ref("Users/MyStocks");
    starCountRef4.on("value", (snapshot) => {
        myStocks = snapshot.val();
    });

    //const x = allStocks.sort((a, b) => a.symbol > b.symbol);

    // adds stocks to list if clicked
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
                    <View>
                        <View style={styles.StockContainer}>
                            <Text style={styles.StockText}>{item.symbol}</Text>
                            <FontAwesomeIcon icon={ faPlusCircle } color={'white'} size={25} onPress={() => pressHandlerBrowse(item)} />
                        </View>
                        <View style={styles.divider}/>
                    </View>
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
        marginHorizontal: 30,
        height: 60,
        alignItems: "center",
        justifyContent: "space-between"
    },
    StockText: {
        flex: 0.5,
        color: "white",
        fontSize: 18
    },
    divider: {
        borderColor: "rgba(255, 255, 255, .1)",
        borderWidth: 1,
    },
})
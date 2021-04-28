import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

var url = "http://192.168.0.37:5000/api";

export default function StockScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState('Monday');
    const [data, setData] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ticker: navigation.getParam('symbol'),
              company: navigation.getParam('name')
            })

        })
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);

      return (
        <ImageBackground source={require('../assets/AppBackground.png')} style={styles.container}>
            <ScrollView>
                <Text style={styles.SymbolText}>{ navigation.getParam('symbol') }</Text>
                <View style={styles.headerContainer}>
                    <Text style={styles.NameText}>{ navigation.getParam('name') }</Text>
                   <Text style={styles.MarketValueText}>${ data.market_price }</Text>
                </View>

               {/*
                <Image
                    resizeMode= 'contain'
                    style={styles.image}
                    source={ navigation.getParam('status')==='up' ? require("../assets/GreenTrendline.png") : require("../assets/RedTrendline.png")}
                />
               */}
                <Text style={styles.AnalysisHeader}>Statistics</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10, justifyContent: 'space-between' }}>
                    <View style={{ marginRight: 10 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Open: </Text>
                            <Text style={styles.StatsValue}>{ data.open }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>High: </Text>
                            <Text style={styles.StatsValue}>{ data.high }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>52 Wk High: </Text>
                            <Text style={styles.StatsValue}>{ data._52WeekHigh }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>52 Wk Change: </Text>
                            <Text style={styles.StatsValue}>{ data._52WeekChange }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Market Cap: </Text>
                            <Text style={styles.StatsValue}>{ data.marketCap }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Avg $ (200 days): </Text>
                            <Text style={styles.StatsValue}>{ data._200dayAvg }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Prev Close: </Text>
                            <Text style={styles.StatsValue}>{ data.close }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Ex Div Date: </Text>
                            <Text style={styles.StatsValue}>{ data.exDividendDate }</Text>
                        </View>
                    </View>
                    <View>
                         <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Volume: </Text>
                            <Text style={styles.StatsValue}>{ data.volume }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Low: </Text>
                            <Text style={styles.StatsValue}>{ data.low }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>52 Wk Low: </Text>
                            <Text style={styles.StatsValue}>{ data._52WeekLow }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>O/S: </Text>
                            <Text style={styles.StatsValue}>{ data.shares_Out }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Div/Yield: </Text>
                            <Text style={styles.StatsValue}>{ data.dividendYield }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Avg.Vol(10 days): </Text>
                            <Text style={styles.StatsValue}>{ data._10daysVol }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Shares Short: </Text>
                            <Text style={styles.StatsValue}>{ data.share_Short }</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <Text style={styles.StatsTitle}>Float Shares: </Text>
                            <Text style={styles.StatsValue}>{ data.float_shares }</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.AnalysisHeader}>Sentiment Analysis on Tweets:</Text>

                {/* temporary placeholder for analysis description */}
                <Text style={styles.AnalysisText}>Total Tweets Accessed: {data.total_count}</Text>
                <Text style={styles.AnalysisText}>Positive Tweets: {data.pos_count}</Text>
                <Text style={styles.AnalysisText}>Negative Tweets: {data.neg_count}</Text>

                <Text style={styles.AnalysisHeader}>Tweets   <FontAwesomeIcon icon={ faTwitter } color={'white'} size={25} /></Text>
                
                <Text style={styles.AnalysisBackground}>{data.p1}</Text>
                <Text style={styles.AnalysisBackground}>{data.p2}</Text>
                <Text style={styles.AnalysisBackground}>{data.p3}</Text>
                <Text style={styles.AnalysisBackground}>{data.n1}</Text>
                <Text style={styles.AnalysisBackground}>{data.n2}</Text>

                <Text style={styles.AnalysisHeader}>News</Text>
                <TouchableOpacity style={styles.AnalysisBackground} onPress={() => Linking.openURL(data.news1_link).catch(err => console.error("Couldn't load page", err))}>
                    <Text style={styles.AnalysisText}>{data.news1_title}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.AnalysisBackground} onPress={() => Linking.openURL(data.news2_link).catch(err => console.error("Couldn't load page", err))}>
                    <Text style={styles.AnalysisText}>{data.news2_title}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.AnalysisBackground} onPress={() => Linking.openURL(data.news3_link).catch(err => console.error("Couldn't load page", err))}>
                    <Text style={styles.AnalysisText}>{data.news3_title}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.AnalysisBackground} onPress={() => Linking.openURL(data.news4_link).catch(err => console.error("Couldn't load page", err))}>
                    <Text style={styles.AnalysisText}>{data.news4_title}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.AnalysisBackground} onPress={() => Linking.openURL(data.news5_link).catch(err => console.error("Couldn't load page", err))}>
                    <Text style={styles.AnalysisText}>{data.news5_title}</Text>
                </TouchableOpacity>
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
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
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
    StatsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 25,
        justifyContent: 'flex-end'
    },
    StatsTitle: {
        color: 'white',
        fontWeight: 'bold'
    },
    StatsValue: {
        color: 'white'
    },
    AnalysisBackground: {
        color: 'white', 
        backgroundColor: '#2f3b52', 
        padding: 20, 
        margin: 10
    },
    AnalysisHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 23,
        marginLeft: 10,
        marginTop: 30
    },
    AnalysisText: {
        color: 'white',
        padding: 3.5,
        marginLeft: 10,
        marginTop: 3.5,
        fontSize: 15
    }
})

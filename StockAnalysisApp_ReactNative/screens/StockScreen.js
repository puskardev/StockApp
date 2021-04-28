import React, {  useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';

var url = "http://10.219.168.64:5000/api";

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
                <Text style={styles.AnalysisHeader}>Stats</Text>

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>Open: {data.open }</Text>
                    <Text style={styles.HighLowValueText}>Volume: { data.volume }</Text>
                </View>

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>High: { data.high }</Text>
                    <Text style={styles.HighLowValueText}>Market Cap: { data.marketCap }</Text>
                </View>

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>Low: {data.low}</Text>
                    <Text style={styles.HighLowValueText}>Float Shares: {data.float_shares}</Text>
                </View>

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>52 Wk High: {data._52WeekHigh}</Text>
                    <Text style={styles.HighLowValueText}>Avg $ (200 days): {data._200dayAvg}</Text>
                </View>

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>52 Wk Low: {data._52WeekLow}</Text>
                    <Text style={styles.HighLowValueText}>Avg.Vol(10 days): {data._10daysVol}</Text>
                </View>

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>52 Wk Change: {data._52WeekChange}</Text>
                    <Text style={styles.HighLowValueText}>O/S: {data.shares_Out}</Text>
                </View>

                <View style={styles.HighLowValueContainer}>
                    <Text style={styles.HighLowValueText}>Prev Close: {data.close}</Text>
                    <Text style={styles.HighLowValueText}>Shares Short: {data.share_Short}</Text>
                </View>

               
                <Text style={styles.AnalysisHeader}>Sentiment Analysis on Tweets:</Text>
                {/* <Text style={styles.AnalysisText}>We suggest to { navigation.getParam('analysis') } this stock.</Text> */}

                {/* temporary placeholder for analysis description */}
                <Text style={styles.AnalysisText}>Total Tweets Accessed: {data.total_count}</Text>
                <Text style={styles.AnalysisText}>Positive Tweets: {data.pos_count}</Text>
                <Text style={styles.AnalysisText}>Negative Tweets: {data.neg_count}</Text>

                <Text style={styles.AnalysisHeader}>Tweets</Text>
                <Text style={{ color: 'white', backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.p1}</Text>
                <Text style={{ color: 'white', backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.p2}</Text>
                <Text style={{ color: 'white', backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.p3}</Text>
                <Text style={{ color: 'white', backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.n1}</Text>
                <Text style={{ color: 'white', backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.n2}</Text>




                {/*
                {neg_array.map(item=>(
                     <Text style={{ color: 'white', marginLeft: 10, paddingLeft: 10 }}>{item}</Text>)
                )}

                */}







                <Text style={styles.AnalysisHeader}>News</Text>

                {/* temporary placeholder for news articles */}
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.news1_title}</Text>
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.news2_title}</Text>
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.news3_title}</Text>
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.news4_title}</Text>
                <Text style={{ backgroundColor: '#2f3b52', padding: 20, margin: 10 }}>{data.news5_title}</Text>

                {/* To get the news link
                  {data.news1_link} and so on...

                */}       
          


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
        fontSize: 20,
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

import requests
import flair
import json
import pandas as pd
import re
from flask import Flask, request
import numpy

# read bearer token for authentication
#with open('bearer_token.txt') as fp:
    #BEARER_TOKEN = fp.read()

app = Flask(__name__)


@app.route("/api", methods=['GET', 'POST'])
def get():
    BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAA8NMwEAAAAA6V3vrLt10lRzbe0gM9Yldssb8Mo%3Dl2KDLPZEsTIWdCm4vxFlGOuYuD6ZeZiwupfXPAIuX3Y9CohuTF'

    req_data = request.get_json()

    ticker = req_data['ticker']

    # parameters for the query.
    params = {'q': ticker,
            'tweet_mode': 'extended',
            'lang': 'en',
            'count': '100'
        }


    # The data/response of the API Call is stored here.
    response = requests.get('https://api.twitter.com/1.1/search/tweets.json',
            params=params,
            headers={'authorization': 'Bearer '+ BEARER_TOKEN}
    )

    # get_data function is for getting the contents from the individual tweet.
    def get_data(tweet):
        data = {
            'id': tweet['id_str'],
            'created_at': tweet['created_at'],
            'text': tweet['full_text']
        }
        return data

    count_tweets = 0
    df = pd.DataFrame()

    # change the reponse to json format.( The response from the APi call is converted to this format to make the data processing easier. )
    for tweet in response.json()['statuses']:
        count_tweets = count_tweets + 1
        row = get_data(tweet)
        df = df.append(row, ignore_index=True)

    # function to clean the tweet. Tweets may contain unnecessary contents such as whitespace, user_name, web_address which are matched and removed usig RE.
    def clean(tweet):
        whitespace = re.compile(r"\s+")
        web_address = re.compile(r"(?i)http(s):\/\/[a-z0-9.~_\-\/]+")
        tesla = re.compile(r"(?i)@Tesla(?=\b)")
        user = re.compile(r"(?i)@[a-z0-9_]+")

        # we then use the sub method to replace anything matching
        tweet = whitespace.sub(' ', tweet)
        tweet = web_address.sub('', tweet)
        tweet = tesla.sub('Tesla', tweet)
        tweet = user.sub('', tweet)
        return tweet


    # we will append probability and sentiment preds later
    probs = []
    sentiments = []
    pos_count = 0
    neg_count = 0
    total_count = 0

    # use regex expressions (in clean function) to clean tweets
    df['text'] = df['text'].apply(clean)

    #create the setiment analysis model.
    sentiment_model = flair.models.TextClassifier.load('en-sentiment')

    for tweet in df['text'].to_list():
        # make prediction
        sentence = flair.data.Sentence(tweet)
        sentiment_model.predict(sentence)
        # extract sentiment prediction
        probs.append(sentence.labels[0].score)  # numerical score 0-1
        sentiments.append(sentence.labels[0].value)  # 'POSITIVE' or 'NEGATIVE'

        total_count= total_count+1

        if(sentence.labels[0].value == 'POSITIVE'):
            pos_count = pos_count+1

        if(sentence.labels[0].value == 'NEGATIVE'):
            neg_count = neg_count+1

    # Add the results from prediction probability and sentiment type to the data frame.
    df['probability'] = probs
    df['sentiment'] = sentiments

    #resp = 'Result from sentiment analysis is TOTAL tweets processed : ' + str(total_count) + '\n' + ' POSITIVE count: ' + str(pos_count) + '\n' + ' NEGATIVE count: ' + str(neg_count) + '\n'

    #print(df)

    select_positive = df.loc[df['sentiment'] == 'POSITIVE']
    select_negative = df.loc[df['sentiment'] == 'NEGATIVE']
    #select_negative.sort_values(by=['probability'], ascending= False)
    #pos_result = select_positive.sort_values(by='probability', ascending=False)
    #first = pos_result.iloc[1]
    pos_tweets = []
    neg_tweets = []

    i=0
    while i<=5:
        temp_pos = select_positive.iloc[i]
        temp_neg = select_negative.iloc[i]
        pos_tweets.append(temp_pos["text"])
        neg_tweets.append(temp_neg["text"])
        i=i+1




    #select_negative = df.loc[df['sentiment'] == 'NEGATIVE']
    #select_negative.sort_values(by=['probability'])
    #print (select_negative)

    #print (resp)
    #print (count_tweets)

    resp = {}

    resp['total_count'] = total_count
    resp['pos_count'] = pos_count
    resp['neg_count'] = neg_count

    resp['p1'] = pos_tweets[0]
    resp['p2'] = pos_tweets[1]
    resp['p3'] = pos_tweets[2]
    resp['p4'] = pos_tweets[3]
    resp['p5'] = pos_tweets[4]

    resp['n1'] = neg_tweets[0]
    resp['n2'] = neg_tweets[1]
    resp['n3'] = neg_tweets[2]
    resp['n4'] = neg_tweets[3]
    resp['n5'] = neg_tweets[4]

    #function to convert large number into human read-able format. (for example 19999 is 19K)
    def human_format(num):
        magnitude = 0
        while abs(num) >= 1000:
            magnitude += 1
            num /= 1000.0
        # add more suffixes if you need them
        return '%.2f%s' % (num, ['', 'K', 'M', 'G', 'T', 'P'][magnitude])



    #Live Stock satistics
    url = "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-statistics"

    querystring = {"symbol":ticker,"region":"US"}

    headers = {
        'x-rapidapi-key': "d3c8a61ac6msh599765c625f3b24p1e4bf2jsnc7e441ef8701",
        'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    response_json = json.loads(response.text)


    # Deafult key Staistics for a stock.
    deafultkeystats = response_json['defaultKeyStatistics']

    resp['shares_Out'] = deafultkeystats['sharesOutstanding']['fmt']
    resp['share_Short'] = deafultkeystats['sharesShort']['fmt']
    resp['float_Shares'] = deafultkeystats['floatShares']['fmt']
    resp['_52WeekChange'] = deafultkeystats['52WeekChange']['fmt']

    #Summary Detail
    summary_detail = response_json['summaryDetail']

    resp['close'] = summary_detail['previousClose']['fmt']
    resp['open'] = summary_detail['regularMarketOpen']['fmt']
    resp['_200dayAvg'] = summary_detail['twoHundredDayAverage']['fmt']
    resp['_10daysVol'] = summary_detail['averageVolume10days']['fmt']
    resp['volume'] = summary_detail['volume']['fmt']
    resp['marketCap'] = summary_detail['marketCap']['fmt']
    resp['_52WeekLow'] = summary_detail['fiftyTwoWeekLow']['fmt']
    resp['high'] = summary_detail['dayHigh']['fmt']
    resp['low'] = summary_detail['regularMarketDayLow']['fmt']
    resp['_52WeekHigh'] = summary_detail['fiftyTwoWeekHigh']['fmt']
    resp['exDividendDate'] = summary_detail['exDividendDate']['fmt']
    resp['dividendYield'] = summary_detail['dividendYield']['fmt']


    #Quote Data
    symbol = response_json['symbol']
    quote_data = response_json['quoteData'][symbol]


    resp['market_changeper'] = quote_data['regularMarketChangePercent']['fmt']
    resp['market_change'] = quote_data['regularMarketChange']['fmt']
    resp['market_price'] = quote_data['regularMarketPrice']['fmt']


    #Stock news
    url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/" + ticker

    headers = {
    'x-rapidapi-key': "d3c8a61ac6msh599765c625f3b24p1e4bf2jsnc7e441ef8701",
    'x-rapidapi-host': "yahoo-finance15.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers)

    #News is an array of news
    news = json.loads(response.text)

    #News 1
    resp['news1_title'] = news[0]['title']
    resp['news1_link'] = news[0]['link']

    #News 2
    resp['news2_title'] = news[1]['title']
    resp['news2_link'] = news[1]['link']

    #News 3
    resp['news3_title'] = news[2]['title']
    resp['news3_link'] = news[2]['link']

    #News 4
    resp['news4_title'] = news[3]['title']
    resp['news4_link'] = news[3]['link']

    #News 5
    resp['news5_title'] = news[4]['title']
    resp['news5_link'] = news[4]['link']
    

    resp = json.dumps(resp)

    print(resp)

    return (resp)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

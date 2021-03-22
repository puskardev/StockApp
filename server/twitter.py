import requests
import flair 
import json
import pandas as pd
import re
from flask import Flask

# read bearer token for authentication
with open('bearer_token.txt') as fp:
    BEARER_TOKEN = fp.read()

ticker = input("Enter the stock ticker or company name: ")

# parameters for the query. 
params = {'q': ticker,
        'tweet_mode': 'extended',
        'lang': 'en',
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

resp = 'Result from sentiment analysis is TOTAL tweets processed : ' + str(total_count) + '\n' + ' POSITIVE count: ' + str(pos_count) + '\n' + ' NEGATIVE count: ' + str(neg_count) + '\n'

print(df)

select_positive = df.loc[df['sentiment'] == 'POSITIVE']
pos_result = select_positive.sort_values(by='probability', ascending=False)
first = pos_result.iloc[1]



select_negative = df.loc[df['sentiment'] == 'NEGATIVE']
select_negative.sort_values(by=['probability'])
#print (select_negative)

print (resp)
#print (count_tweets)


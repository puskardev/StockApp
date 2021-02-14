import requests
import json
import pandas as pd

from flask import Flask


app = Flask(__name__)


@app.route('/', methods=['GET'])
def get_data():
    url = "https://alpha-vantage.p.rapidapi.com/query"

    user_input = 'AAPL'
    #input("Enter the stock ticker: ")

    tic = user_input.capitalize()

    #Global info of a input stock.
    #querystring = {"function":"GLOBAL_QUOTE","symbol":tic}

    #time series of weekly stock
    #querystring = {"function":"TIME_SERIES_WEEKLY","symbol":tic,"datatype":"json"}

    #daily time series for a stock!
    querystring = {"function":"TIME_SERIES_DAILY_ADJUSTED","symbol":tic,"outputsize":"compact","datatype":"json"}

    headers = {
        'x-rapidapi-key': "d3c8a61ac6msh599765c625f3b24p1e4bf2jsnc7e441ef8701",
        'x-rapidapi-host': "alpha-vantage.p.rapidapi.com"
   }

    response = requests.request("GET", url, headers=headers, params=querystring)

    y = json.loads(response.text)

    x = y["Time Series (Daily)"]

    return(x["2021-02-05"])


    #df = pd.read_json(response.text)

    #df.to_csv("data.csv", encoding='utf-8', index=False)

    #return("Hello world")

if __name__ == '__main__':
    app.run(debug=True)





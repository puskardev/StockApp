from flask import Flask
import json



app = Flask(__name__)


@app.route("/api", methods=["GET"])
def get():

    dict = {}

    dict['total_count'] = 10
    dict['pos_count'] = 5
    dict['neg_count'] = 7

    r = json.dumps(dict)

    return (r)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

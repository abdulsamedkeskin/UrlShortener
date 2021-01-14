from flask import Flask,redirect
import flask
from pymongo import MongoClient
import random, string
from flask import request
from flask_cors import CORS

client = MongoClient('mongodburl')
db = client['UrlShortener']
db_collection = db['UrlShortener']

app = Flask(__name__)
cors = CORS(app)
def generate_unique_code():
    length = 4
    code = ''.join(random.choices(string.ascii_letters, k=length))
    for i in db_collection.find():
        check = i['short']
        if not check == code:
            return code
        else:
            break

@app.route("/<url>")
def main(url):
    dictionary = {
        "short":url
    }
    for i in db_collection.find(dictionary):
        if i['short'] == url:
            if not i['original'].find('http://') == -1 or not i['original'].find('https://') == -1:
                redirect_url = i['original']
            else:
                redirect_url = "http://" + i['original']
            return {"url":redirect_url}
        else:
            return {"Hata":"Böyle Bir Link Yok"}

@app.route('/add',methods=['POST'])
def add():
    short_link = generate_unique_code()
    data = request.get_json(force=True)
    def check():
        try:
            value = data['link']
            try:
                check_value = str(value)
                if not check_value.find('http://') == -1 or not check_value.find('https://') == -1:
                    new_value = f"http://{check_value}"
            except:
                return {"Hata":"Hata Meydana Geldi"}
            insert_data = {
                "original": str(value),
                "short": short_link
            }
            add = db_collection.insert_one(insert_data)
            return {"success": True, "url": "http://urlkisa.rf.gd/{}/".format(short_link)}
        except:
            return {"Yanlış İstek":"Hata"}
    return check()

if __name__ == '__main__':
    app.run(debug=True)
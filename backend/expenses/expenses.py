# -*- coding: utf-8 -*-
from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def hello():
    user = app.config['USERS'].keys()[0]
    return jsonify({"Hello": user})


if __name__ == "__main__":
    app.config.update(dict(
        USERS={
            'alice': 'asdf'
        }
    ))
    app.run(debug=True)

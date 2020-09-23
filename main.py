from flask import Flask, request, redirect, render_template, url_for, session, escape, flash
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard')


if __name__ == '__main__':
    app.run(debug=True)

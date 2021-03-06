from flask import Flask, request, redirect, render_template, url_for, session, escape, flash
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)


ENV = 'env'


if ENV == 'dev':
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://soare:2302@localhost/test_db'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://zbeubugiegpsjm:1494466c39ee9e22ccc39bbf2fb179493c0e6d73dceb6e8ab0b62dbb591801f1@ec2-35-172-73-125.compute-1.amazonaws.com:5432/df2sdcib1164lq'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Score(db.Model):
    __tablename__ = 'score'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200))
    score = db.Column(db.Integer)

    def __init__(self, username, score):
        self.username = username
        self.score = score


@app.route('/', methods=["GET", "POST"])
def hello_world():
    if request.method == "POST":
        result = request.get_json()
        username = result['username']
        user_score = result['score']
        data = Score(username, user_score)
        db.session.add(data)
        db.session.commit()
        return render_template('leaderboard.html')
    return render_template('index.html')


@app.route('/leaderboard')
def leaderboard():
    top10 = Score.query.order_by(Score.score.desc()).limit(10).all()
    return render_template('leaderboard.html', top10=top10)


@app.route('/rules')
def rules():
    return render_template('rules.html')


if __name__ == '__main__':
    app.run()

from flask import Flask, request, redirect, render_template, url_for, session, escape, flash
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)

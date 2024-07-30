from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/game')
def game():
    return render_template('game.html')

@app.route('/create_player')
def create_player():
    player = request.args.get('player')
    return render_template('create_player.html', player=player)

if __name__ == '__main__':
    app.run(debug=True)

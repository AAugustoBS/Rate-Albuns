from flask import Flask,request, jsonify
from flask_cors import CORS
from database.database import DatabaseManager
from auth.token import generate_token
import bcrypt
from api.spotify import SpotifyAPI
from api.wikipedia import WikipediaAPI
import json
 
# Initializing flask app
app = Flask(__name__)
CORS(app)
database = DatabaseManager()
spotifyAPI = SpotifyAPI()
wikipediaAPI = WikipediaAPI()
SECRET_KEY = 'sua_chave_secreta_aqui'


@app.route('/register', methods=['POST'])
def register():
    
    if not request.is_json:
        return jsonify({"error": "Request body must be JSON"}), 400

    data = request.get_json()
    if database.checkUserDatabase((data['email'], data['username'])):
        return jsonify({"error": "User or Email already exists!"}), 400
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    database.newUserDatabase((data['username'], data['email'], hashed_password))
    
    return jsonify({"message": "Dados recebidos com sucesso!", "received_data": data}), 200
    
    
    
@app.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"error": "Request body must be JSON"}), 400
    data = request.get_json()
    user = database.getUserDatabase(data['email'])
    if user is None:
        return jsonify({"error": "User not found or password wrong!"}), 404
    salt = bcrypt.gensalt()
    print(user)
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), salt)
    if not bcrypt.checkpw(data['password'].encode('utf-8'), hashed_password):
        return jsonify({"error": "Invalid password!"}), 400
    token = generate_token(SECRET_KEY, user[1])
    return jsonify({"message": "Login realizado com sucesso!", 'token': token,'userName': user[1]}), 200


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter 'query' is required"}), 400

    response = spotifyAPI.search(query)
    
    return jsonify({"message": "Search successfully!", 'data': json.dumps(response)}), 200

@app.route('/artist', methods=['GET'])
def artist():
    artist_id = request.args.get('id')
    artist_name = request.args.get('name')
    if not artist_id or not artist_name:
        return jsonify({"error": "Query parameter 'id' is required"}), 400
    
    albuns = spotifyAPI.get_artist_albums(artist_id)
    artist_info = wikipediaAPI.get_artist_info(artist_name)
    
    return jsonify({"message": "Search successfully!", 'albuns': json.dumps(albuns)}), 200
# Running app
if __name__ == '__main__':
    app.run(debug=True)
    
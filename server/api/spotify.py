import requests
import base64
import datetime
from urllib.parse import urlencode
import api.utils.json_handler as json_handler
from api.credential import CLIENT_SECRET, CLIENT_ID
class SpotifyAPI:
    lastToken = None
    def __init__(self):
        if SpotifyAPI.lastToken is None or self.token_expired():
            self.refresh_token()
        
    def token_expired(self):
        if SpotifyAPI.lastToken is not None:
            now = datetime.datetime.now()
            expiration_time = SpotifyAPI.lastToken['expires_in']
            token_time = SpotifyAPI.lastToken['timestamp']
            if now - token_time >= datetime.timedelta(seconds=expiration_time):
                return True
        return False

    def refresh_token(self):
        client_creds = f"{CLIENT_ID}:{CLIENT_SECRET}"
        client_creds_b64 = base64.b64encode(client_creds.encode())
        token_url = "https://accounts.spotify.com/api/token"
        method = "POST"
        token_data = {
            "grant_type": "client_credentials"
        }

        token_headers = {
            "Authorization": f"Basic {client_creds_b64.decode()}"
        }
        req = requests.post(token_url, data=token_data, headers=token_headers)
        token_response_data = req.json()
        access_token = token_response_data['access_token']
        expires_in = token_response_data['expires_in']
        token_type = token_response_data['token_type']
        self.lastToken = {
            'access_token': access_token,
            'expires_in': expires_in,
            'token_type': token_type,
            'timestamp': datetime.datetime.now()
        }
        
    
    def search(self,query):
        if self.token_expired():
            self.refresh_token()
        headers = {
            "Authorization": f"Bearer {self.lastToken['access_token']}"
        }
        endpoint = "https://api.spotify.com/v1/search"
        data = urlencode({"q": query, "type": "artist,album", "limit": 2, 'market': 'US'})
        
        lookup_url = f"{endpoint}?{data}"
        
        req = requests.get(lookup_url, headers=headers)
        
        response = json_handler.info_retriever(req.json())
        return response
    
    def get_artist_albums(self, artist_id):
        if self.token_expired():
            self.refresh_token()
        headers = { "Authorization": f"Bearer {self.lastToken['access_token']}"}
        endpoint = f"https://api.spotify.com/v1/artists/{artist_id}/albums"
        data = urlencode({"limit": 50, 'market': 'US','include_groups': 'album'})
        lookup_url = f"{endpoint}?{data}"
        req = requests.get(lookup_url, headers=headers)
        response = json_handler.info_album_retriver(req.json())
        
        return response
        
   
# if __name__ == "__main__":
#     print('rodando...')
#     spotify = SpotifyAPI()
#     spotify.search("Offspring")
    





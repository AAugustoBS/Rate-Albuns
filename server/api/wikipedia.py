import requests
import base64
import datetime
from urllib.parse import urlencode
import api.utils.json_handler as json_handler
from api.credential import WIKI_CLIENT_ID, WIKI_CLIENT_SECRET, WIKI_ACCESS_TOKEN


class WikipediaAPI:
    def __init__(self):
        pass
    
    def get_artist_info(self,artist_name):
        params = {
            "action": "query",
            "format": "json",
            "titles": artist_name,
            "prop": "extracts",
            "exintro": True,
            "explaintext": True,
            "redirects": 1,
            "formatversion": 2
        }
        
        headers = {
            "Authorization": f"Bearer {WIKI_ACCESS_TOKEN}"}
        response = requests.get("https://en.wikipedia.org/w/api.php", params=params, headers=headers)
        #artist_name = artist_name.lower().replace(" ", "_")
        print(response.json())
        return None
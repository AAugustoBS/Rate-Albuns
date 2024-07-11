
def info_retriever(jsonData):
    extracted = []
    
    for item in jsonData:
        if item == 'artists':
            for artist in jsonData[item]['items']:
                extracted.append({
                    'name': artist['name'],
                    'id': artist['id'],
                    'type': 'artist',
                    'id': artist['id'],
                    'images': artist['images'][0]['url'] if artist['images'] else None,
                    'uri': artist['uri']
                })
        if item == 'albums':
            for album in jsonData[item]['items']:
                extracted.append({
                    'name': album['name'],
                    'id': album['id'],
                    'type': 'album',
                    'artist': album['artists'][0]['name'],
                    'artist_id': album['artists'][0]['id'],
                    'images': album['images'][1] if album['images'] else None,
                    'release_date': album['release_date'],
                    'uri': album['uri']            
                })
    return extracted

if __name__ == "__main__":
    print("This is a json handler file")
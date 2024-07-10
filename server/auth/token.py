import jwt

def generate_token(data, secret_key):
    return jwt.encode({
            'id': data[0],
            'user': data[1],
        }, secret_key)
    
##criar função decode
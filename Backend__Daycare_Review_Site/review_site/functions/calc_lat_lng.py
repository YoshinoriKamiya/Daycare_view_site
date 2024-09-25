import requests

def get_lat_lng(address):
    # Google Maps APIキーを入力してください
    api_key = "AIzaSyCA5voL0Z3oJMnWIdqRBfue8WmjKYeDRag"
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": api_key
    }
    response = requests.get(base_url, params=params)
    results = response.json().get("results")
    if results:
        location = results[0].get("geometry").get("location")
        return location["lat"], location["lng"]
    else:
        return None, None

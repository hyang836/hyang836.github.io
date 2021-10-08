import requests
import time
from flask import Flask, request, render_template, redirect, url_for, jsonify, json
from datetime import datetime

app = Flask(__name__, static_url_path='')


@app.route('/', methods=["GET", "POST"])
def index():
    return app.send_static_file('search.html')


@app.route('/app', methods=["GET"])
def hello_world():
    address = json.loads(request.args.get("address"))
    loc = ""
    API_KEY = "AIzaSyCM7s8XMyDvSW2debhps_fmksNZA9jOsss"
    base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'

    if 'street' in address:
        address = address['street'] + address['city'] + address['state']
        params = {
            'key': API_KEY,
            'address': address
        }
        response = requests.get(base_url, params=params).json()
        geometry = response['results'][0]['geometry']
        format_address = response['results'][0]['formatted_address']
        lat = geometry['location']['lat']
        lon = geometry['location']['lng']
        loc = str(lat) + ',' + str(lon)

    else:
        loc = address['loc']
        format_address = address['city'] + ',' + address['country']

    url = 'https://api.tomorrow.io/v4/timelines'
    querystring = {'apikey': 'AXlmNKxmwza8CLBrDmn3jligMJYo7379'}
    card_payload = {
        "fields": ["temperature", "pressureSeaLevel", "humidity", "windSpeed", "visibility",
                   "cloudCover", "uvIndex", "weatherCode"],
        "units": "imperial",
        "timesteps": ["current"],
        "location": loc,
        "timezone": "America/Los_Angeles"
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    dict_weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    dict_month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    dict_status = {
        "4201": "Heavy Rain",
        "4001": "Rain",
        "4200": "Light Rain",
        "6201": "Heavy Freezing Rain",
        "6001": "Freezing Rain",
        "6200": "Light Freezing Rain",
        "6000": "Freezing Drizzle",
        "4000": "Drizzle",
        "7101": "Heavy Ice Pellets",
        "7000": "Ice Pellets",
        "7102": "Light Ice Pellets",
        "5101": "Heavy Snow",
        "5000": "Snow",
        "5100": "Light Snow",
        "5001": "Flurries",
        "8000": "Thunderstorm",
        "2100": "Light Fog",
        "2000": "Fog",
        "1001": "Cloudy",
        "1102": "Mostly Cloudy",
        "1101": "Partly Cloudy",
        "1100": "Mostly Clear",
        "1000": "Clear"
    }
    dict_link = {
        "4201": "img/rain_heavy.svg",
        "4001": "img/rain.svg",
        "4200": "img/rain_light.svg",
        "6201": "img/freezing_rain_heavy.svg",
        "6001": "img/freezing_rain.svg",
        "6200": "img/freezing_rain_light.svg",
        "6000": "img/freezing_drizzle.svg",
        "4000": "img/drizzle.svg",
        "7101": "img/ice_pellets_heavy.svg",
        "7000": "img/ice_pellets.svg",
        "7102": "img/ice_pellets_light.svg",
        "5101": "img/snow_heavy.svg",
        "5000": "img/snow.svg",
        "5100": "img/snow_light.svg",
        "5001": "img/flurries.svg",
        "8000": "img/tstorm.svg",
        "2100": "img/fog_light.svg",
        "2000": "img/fog.svg",
        "1001": "img/cloudy.svg",
        "1102": "img/mostly_cloudy.svg",
        "1101": "img/partly_cloudy_day.svg",
        "1100": "img/mostly_clear_day.svg",
        "1000": "img/clear_day.svg"
    }

    result = requests.request("POST", url, json=card_payload, headers=headers, params=querystring).json()
    temperature = result['data']['timelines'][0]['intervals'][0]['values']['temperature']
    humidity = result['data']['timelines'][0]['intervals'][0]['values']['humidity']
    pressure = result['data']['timelines'][0]['intervals'][0]['values']['pressureSeaLevel']
    wind_speed_one = result['data']['timelines'][0]['intervals'][0]['values']['windSpeed']
    visibility = result['data']['timelines'][0]['intervals'][0]['values']['visibility']
    cloud_cover = result['data']['timelines'][0]['intervals'][0]['values']['cloudCover']
    uv_level = result['data']['timelines'][0]['intervals'][0]['values']['uvIndex']
    wC = result['data']['timelines'][0]['intervals'][0]['values']['weatherCode']
    weatherStatus_one = dict_status[str(wC)]
    weatherLink_one = dict_link[str(wC)]
    card = {
        "temperature": temperature,
        "humidity": humidity,
        "pressure": pressure,
        "wind_speed_one": wind_speed_one,
        "visibility": visibility,
        "cloud_cover": cloud_cover,
        "uv_level": uv_level,
        "weatherStatus_one": weatherStatus_one,
        "weatherLink_one": weatherLink_one,
        "format_address": format_address
    }

    url_two = 'https://api.tomorrow.io/v4/timelines'
    querystring_two = {'apikey': 'AXlmNKxmwza8CLBrDmn3jligMJYo7379'}
    card_payload_two = {
        "fields": ["temperatureMax", "temperatureMin", "windSpeed", "weatherCode", "windSpeed", "humidity", "sunriseTime", "sunsetTime", "visibility", "precipitationProbability", "precipitationType"],
        "units": "imperial",
        "timesteps": ["1d"],
        "location": loc,
        "timezone": "America/Los_Angeles"
    }
    headers_two = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    result_two = requests.request("POST", url_two, json=card_payload_two, headers=headers_two, params=querystring_two).json()
    data_two = {}
    tem_Max_two = {}
    tem_Min_two = {}
    tem_sum = {}
    wind_two = {}
    w_code_two = {}
    weatherStatus = {}
    weatherLink = {}
    humidity_two = {}
    sunRaise = {}
    sunSet = {}
    suntime = {}
    visibility_two = {}
    probability = {}
    type = {}
    chart_one = []
    chart_day = []

    for i in range(0, 15):
        mid = []
        data_two[i] = result_two['data']['timelines'][0]['intervals'][i]['startTime']
        text = str(data_two[i])[0:10]
        year = int(text[0:4])
        month = int(text[5:7])
        day = int(text[8:10])

        date = datetime.date(datetime(year=year, month=month, day=day))
        ta = time.strptime(str(date), "%Y-%m-%d")
        tt = time.mktime(ta)

        weekday = dict_weekday[int(date.strftime("%w"))]
        data_two[i] = weekday + ',' + ' ' + text[8:10] + ' ' + dict_month[month-1] + ' ' + text[0:4]
        tem_Max_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['temperatureMax']
        tem_Min_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['temperatureMin']

        x = text[8:10] + ' ' + dict_month[month-1]

        chart_day.append(x)
        mid.append(tt*1000)
        mid.append(tem_Min_two[i])
        mid.append(tem_Max_two[i])
        chart_one.append(mid)

        tem_sum[i] = str(tem_Max_two[i]) + "°F/" + str(tem_Min_two[i]) + "°F"
        wind_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['windSpeed']
        w_code_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['weatherCode']
        weatherStatus[i] = dict_status[str(w_code_two[i])]
        weatherLink[i] = dict_link[str(w_code_two[i])]
        humidity_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['humidity']
        sunRaise[i] = str(result_two['data']['timelines'][0]['intervals'][i]['values']['sunriseTime'])[12:13]
        sunSet[i] = str(result_two['data']['timelines'][0]['intervals'][i]['values']['sunsetTime'])[11:13]
        suntime[i] = sunRaise[i] + "AM/" + str(int(sunSet[i]) - 12) + "PM"
        visibility_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['visibility']
        probability[i] =  result_two['data']['timelines'][0]['intervals'][i]['values']['precipitationProbability']
        type[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['precipitationType']

    table = {
        "data_two": data_two,
        "tem_Max_two": tem_Max_two,
        "tem_Min_two": tem_Min_two,
        "tem_sum": tem_sum,
        "wind_two": wind_two,
        "w_code_two": w_code_two,
        "weatherStatus": weatherStatus,
        "weatherLink": weatherLink,
        "humidity_two": humidity_two,
        "visibility": visibility_two,
        "probability": probability,
        "suntime": suntime,
        "type": type
    }
    chart = {
        "chart_day": chart_day,
        "chart_one": chart_one
    }
    final = {
        "card": card,
        "table": table,
        "chart": chart
    }
    return jsonify(final)


if __name__ == '__main__':
    app.run()



'''
def hello_world():
    if request.method == "GET":
        street = request.values.get("street")
        city = request.values.get("city")
        state = request.values.get("state")
    API_KEY = "AIzaSyCM7s8XMyDvSW2debhps_fmksNZA9jOsss"
    address = street + city + state
    params = {
        'key': API_KEY,
        'address': address
    }
    base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'
    response = requests.get(base_url, params=params).json()
    geometry = response['results'][0]['geometry']
    format_address = response['results'][0]['formatted_address']
    lat = geometry['location']['lat']
    lon = geometry['location']['lng']
    loc = str(lat) + ',' + str(lon)

    url = 'https://api.tomorrow.io/v4/timelines'
    querystring = {'apikey': 'qSiBgRO1bJM1duShNZjTFrnKtua57Z18'}
    card_payload = {
        "fields": ["temperature", "pressureSeaLevel", "humidity", "windSpeed", "visibility",
                   "cloudCover", "uvIndex", "weatherCode"],
        "units": "imperial",
        "timesteps": ["current"],
        "location": loc,
        "timezone": "America/Los_Angeles"
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    dict_weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    dict_month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    dict_status = {
        "4201": "Heavy Rain",
        "4001": "Rain",
        "4200": "Light Rain",
        "6201": "Heavy Freezing Rain",
        "6001": "Freezing Rain",
        "6200": "Light Freezing Rain",
        "6000": "Freezing Drizzle",
        "4000": "Drizzle",
        "7101": "Heavy Ice Pellets",
        "7000": "Ice Pellets",
        "7102": "Light Ice Pellets",
        "5101": "Heavy Snow",
        "5000": "Snow",
        "5100": "Light Snow",
        "5001": "Flurries",
        "8000": "Thunderstorm",
        "2100": "Light Fog",
        "2000": "Fog",
        "1001": "Cloudy",
        "1102": "Mostly Cloudy",
        "1101": "Partly Cloudy",
        "1100": "Mostly Clear",
        "1000": "Clear"
    }
    dict_link = {
        "4201": "../static/img/rain_heavy.svg",
        "4001": "../static/img/rain.svg",
        "4200": "../static/img/rain_light.svg",
        "6201": "../static/img/freezing_rain_heavy.svg",
        "6001": "../static/img/freezing_rain.svg",
        "6200": "../static/img/freezing_rain_light.svg",
        "6000": "../static/img/freezing_drizzle.svg",
        "4000": "../static/img/drizzle.svg",
        "7101": "../static/img/ice_pellets_heavy.svg",
        "7000": "../static/img/ice_pellets.svg",
        "7102": "../static/img/ice_pellets_light.svg",
        "5101": "../static/img/snow_heavy.svg",
        "5000": "../static/img/snow.svg",
        "5100": "../static/img/snow_light.svg",
        "5001": "../static/img/flurries.svg",
        "8000": "../static/img/tstorm.svg",
        "2100": "../static/img/fog_light.svg",
        "2000": "../static/img/fog.svg",
        "1001": "../static/img/cloudy.svg",
        "1102": "../static/img/mostly_cloudy.svg",
        "1101": "../static/img/partly_cloudy_day.svg",
        "1100": "../static/img/mostly_clear_day.svg",
        "1000": "../static/img/clear_day.svg"
    }

    result = requests.request("POST", url, json=card_payload, headers=headers, params=querystring).json()
    temperature = result['data']['timelines'][0]['intervals'][0]['values']['temperature']
    humidity = result['data']['timelines'][0]['intervals'][0]['values']['humidity']
    pressure = result['data']['timelines'][0]['intervals'][0]['values']['pressureSeaLevel']
    wind_speed_one = result['data']['timelines'][0]['intervals'][0]['values']['windSpeed']
    visibility = result['data']['timelines'][0]['intervals'][0]['values']['visibility']
    cloud_cover = result['data']['timelines'][0]['intervals'][0]['values']['cloudCover']
    uv_level = result['data']['timelines'][0]['intervals'][0]['values']['uvIndex']
    wC = result['data']['timelines'][0]['intervals'][0]['values']['weatherCode']
    weatherStatus_one = dict_status[str(wC)]
    weatherLink_one = dict_link[str(wC)]
    card = {
        "temperature": temperature,
        "humidity": humidity,
        "pressure": pressure,
        "wind_speed_one": wind_speed_one,
        "visibility": visibility,
        "cloud_cover": cloud_cover,
        "uv_level": uv_level,
        "weatherStatus_one": weatherStatus_one,
        "weatherLink_one": weatherLink_one,
        "format_address": format_address
    }

    url_two = 'https://api.tomorrow.io/v4/timelines'
    querystring_two = {'apikey': 'qSiBgRO1bJM1duShNZjTFrnKtua57Z18'}
    card_payload_two = {
        "fields": ["temperatureMax", "temperatureMin", "windSpeed", "weatherCode"],
        "units": "imperial",
        "timesteps": ["1d"],
        "location": loc,
        "timezone": "America/Los_Angeles"
    }
    headers_two = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    result_two = requests.request("POST", url_two, json=card_payload_two, headers=headers_two, params=querystring_two).json()
    data_two = {}
    tem_Max_two = {}
    tem_Min_two = {}
    wind_two = {}
    w_code_two = {}
    weatherStatus = {}
    weatherLink = {}
    for i in range(0, 15):
        data_two[i] = result_two['data']['timelines'][0]['intervals'][i]['startTime']
        text = str(data_two[i])[0:10]
        year = int(text[0:4])
        month = int(text[5:7])
        day = int(text[8:10])

        date = datetime.date(datetime(year=year, month=month, day=day))
        weekday = dict_weekday[int(date.strftime("%w"))]

        data_two[i] = weekday + ',' + ' ' + text[8:10] + ' ' + dict_month[month-1] + ' ' + text[0:4]
        tem_Max_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['temperatureMax']
        tem_Min_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['temperatureMin']
        wind_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['windSpeed']
        w_code_two[i] = result_two['data']['timelines'][0]['intervals'][i]['values']['weatherCode']
        weatherStatus[i] = dict_status[str(w_code_two[i])]
        weatherLink[i] = dict_link[str(w_code_two[i])]
    table = {
        "data_two": data_two,
        "tem_Max_two": tem_Max_two,
        "tem_Min_two": tem_Min_two,
        "wind_two": wind_two,
        "w_code_two": w_code_two,
        "weatherStatus": weatherStatus,
        "weatherLink": weatherLink
    }
    print(card)
    print(table)
    final = {
        "card": card,
        "table": table
    }
return render_template('tableOne.html', temperature=temperature, humidity=humidity, pressure=pressure, wind_speed_one=wind_speed_one, visibility=visibility, cloud_cover=cloud_cover, uv_level=uv_level, \
                           format_address=format_address, data_two=data_two, tem_Max_two=tem_Max_two, tem_Min_two=tem_Min_two, wind_two=wind_two, dict_status=dict_status, dict_link=dict_link, \
                           weatherStatus=weatherStatus, weatherLink=weatherLink, weatherStatus_one=weatherStatus_one, weatherLink_one=weatherLink_one)
'''

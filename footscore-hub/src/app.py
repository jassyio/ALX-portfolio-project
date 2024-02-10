from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# Function to establish a connection to the MySQL database
def create_connection():
    # Your database configuration
    db_config = {
        'host': 'localhost',
        'user': 'jassy',
        'password': '2024_password',
        'database': 'unlimited',
    }

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        print('Connection successful')
        return connection
    except Error as e:
        print('Error creating database connection:', e)
        return None

# Function to fetch data from the Football Data API
def fetch_football_data():
    # Make a GET request to the Football Data API to fetch data
    api_url = 'https://api.football-data.org/v4/matches?status=FINISHED&competitions=CL'
    headers = {'X-Auth-Token': '0d2f22de8f4e40d3804c8d2b3239ef5b'}  # Replace 'YOUR_API_KEY' with your actual API key
    response = requests.get(api_url, headers=headers)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        data = response.json()
        print("Response data:", data)  # Print the response data for debugging
        if 'competitions' in data:
            return data['competitions']  # Extract relevant data from the response
    else:
        print('Failed to fetch data from the Football Data API')
        return None

# Route for home page
@app.route('/')
def home():
    return "Welcome to Footscore Hub!"  # You can customize this message

# Route for fetching news
@app.route('/unlimited/News')
def get_news():
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT * FROM news'
            cursor.execute(query)
            news_data = cursor.fetchall()
            print(news_data)
            return jsonify(news_data)
        except Error as e:
            print('Error fetching news data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

# Route for inserting competition data into the database
# Route for fetching competition data from the database
@app.route('/unlimited/competitions')
def get_competitions():
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT * FROM competitions'
            cursor.execute(query)
            competitions = cursor.fetchall()
            return jsonify(competitions)
        except Error as e:
            print('Error fetching competitions:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

# Route for fetching teams by competition ID
@app.route('/teams/<int:competition_id>')
def get_teams_by_competition(competition_id):
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT * FROM teams WHERE competition_id = %s'
            cursor.execute(query, (competition_id,))
            teams = cursor.fetchall()
            return jsonify(teams)
        except Error as e:
            print('Error fetching teams:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

# Route for inserting advert data into the database
@app.route('/unlimited/advert', methods=['POST'])
def insert_advert():
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor()
            # Extract advert data from the request
            data = request.json
            title = data.get('title')
            description = data.get('description')
            image_url = data.get(r'C:\Users\User\Pictures\adverts\ad.png')

            # Insert advert data into the database
            query = 'INSERT INTO advert (title, description, image_url) VALUES (%s, %s, %s)'
            cursor.execute(query, (title, description, image_url))
            connection.commit()
            print(data)
            return jsonify({'message': 'Advert inserted successfully'}), 201
        except Error as e:
            print('Error inserting advert data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

# Route for fetching advert data from the database
@app.route('/unlimited/advert', methods=['GET'])
def get_adverts():
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT * FROM advert'
            cursor.execute(query)
            adverts = cursor.fetchall()
            return jsonify(adverts)
        except Error as e:
            print('Error fetching advert data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)

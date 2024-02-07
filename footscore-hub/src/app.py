from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import requests

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
@app.route('/competitions', methods=['GET'])
def get_all_competitions():
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, name, country, season FROM competitions")
    competitions = cur.fetchall()
    cur.close()
    return jsonify(competitions)



# # Function to insert data into the competitions table in the database
# def insert_competitions_data(competitions):
#     connection = create_connection()
#     if connection is not None:
#         try:
#             cursor = connection.cursor()
#             for competition in competitions:
#                 query = 'INSERT INTO competitions (name, code, type, emblem) VALUES (%s, %s, %s, %s)'
#                 cursor.execute(query, (competition['name'], competition['code'], competition['type'], competition['emblem']))
#             connection.commit()
#             print('Competitions data inserted successfully')
#         except Error as e:
#             print('Error inserting competitions data:', e)
#         finally:
#             cursor.close()
#             connection.close()
#     else:
#         print('Failed to establish database connection')

@app.route('/')
def home():
    return "Welcome to Footscore Hub!"  # You can customize this message

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

@app.route('/competitions')
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

if __name__ == '__main__':
    # Fetch data from the Football Data API and store it in the database
    football_data = fetch_football_data()
    if football_data:
        insert_competitions_data(football_data)

    # Run the Flask app
    app.run(port=5000, debug=True)

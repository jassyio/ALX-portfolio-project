# Importing necessary libraries
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import requests

# Creating the Flask app instance
app = Flask(__name__)
CORS(app)

# Function to establish a connection to the MySQL database
def create_connection():
    # Your database configuration
    db_config = {
        'host': 'localhost',
        'user': 'jassy',
        'password': '2024_password',
        'database': 'scorehub',
    }

    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        print('Connection successful')
        return connection
    except Error as e:
        print('Error creating database connection:', e)
        return None

# Route for home page
@app.route('/')
def home():
    # Redirect to the standings for La Liga (league_id=2) by default
    return redirect('/scorehub/standings/2')

# Route for fetching standings for a specific league
@app.route('/scorehub/standings/<int:league_id>')
def get_standings(league_id):
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            # Fetch standings data for the specified league
            query = 'SELECT * FROM standings WHERE league_id = %s'
            cursor.execute(query, (league_id,))
            standings_data = cursor.fetchall()
            print('Fetched standings data:', standings_data)  # Print fetched data for debugging
            return jsonify(standings_data)
        except Error as e:
            print('Error fetching standings data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

# Route for fetching teams for a specific league
@app.route('/scorehub/teams/<int:league_id>')
def get_teams(league_id):
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            # Fetch teams data for the specified league
            query = 'SELECT * FROM teams WHERE league_id = %s'
            cursor.execute(query, (league_id,))
            teams_data = cursor.fetchall()
            print('Fetched teams data:', teams_data)  # Print fetched data for debugging
            return jsonify(teams_data)
        except Error as e: 
            print('Error fetching teams data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

# Route for fetching fixtures for a specific league
@app.route('/scorehub/fixtures/<int:league_id>')
def get_fixtures(league_id):
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            # Fetch fixtures data for the specified league
            query = 'SELECT * FROM fixtures WHERE league_id = %s'
            cursor.execute(query, (league_id,))
            fixtures_data = cursor.fetchall()
            print('Fetched fixtures data:', fixtures_data)  # Print fetched data for debugging
            return jsonify(fixtures_data)
        except Error as e:
            print('Error fetching fixtures data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500
    # Route for fetching matches for a specific league
@app.route('/scorehub/matches/<int:league_id>')
def get_matches(league_id):
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            # Fetch matches data for the specified league
            query = 'SELECT * FROM matches WHERE league_id = %s'
            cursor.execute(query, (league_id,))
            matches_data = cursor.fetchall()
            print('Fetched matches data:', matches_data)  # Print fetched data for debugging
            return jsonify(matches_data)
        except Error as e:
            print('Error fetching matches data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500
@app.route('/scorehub/news')
def get_news():
    try:
        # Make a GET request to the external API to fetch news data
        response = requests.get(f'https://newsapi.org/v2/everything?q=football&apiKey=c759ee1ddcb0459fbc174c6274bb5ac0')
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON response and return it
            news_data = response.json()
            return jsonify(news_data)
        else:
            # If the request was unsuccessful, return an error message
            return jsonify({'error': 'Failed to fetch news data'}), response.status_code
    except Exception as e:
        # If an exception occurs during the request, return an error message
        return jsonify({'error': 'An error occurred while fetching news data'}), 500



# Main function to run the Flask app
if __name__ == '__main__':
    app.run(port=5000, debug=True)

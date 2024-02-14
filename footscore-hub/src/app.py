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
# Note: You haven't implemented this function. You may need to implement it if required.

# Route for home page
@app.route('/')
def home():
    return "Welcome to Footscore Hub!"  # You can customize this message

# Route for fetching news
@app.route('/unlimited/news')
def get_news():
    connection = create_connection()
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT * FROM news'
            cursor.execute(query)
            news_data = cursor.fetchall()
            # print(news_data)
            return jsonify(news_data)
        except Error as e:
            print('Error fetching news data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

# Route for fetching competitions










if __name__ == '__main__':
    app.run(port=5000, debug=True)

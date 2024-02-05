from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'jassy',
    'password': '2024_password',
    'database': 'unlimited',
}

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print('Error creating database connection:', e)
        return None

@app.route('/unlimited/news')
def get_news():
    connection = create_connection()
    
    if connection is not None:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT * FROM news'
            cursor.execute(query)
            news_data = cursor.fetchall()
            return jsonify(news_data)
        except Error as e:
            print('Error fetching news data:', e)
            return jsonify({'error': 'Internal Server Error'}), 500
        finally:
            cursor.close()
            connection.close()
    else:
        return jsonify({'error': 'Failed to establish database connection'}), 500

if __name__ == '__main__':
    app.run(port=5000)

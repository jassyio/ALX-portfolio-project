import requests
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Create Flask app instance
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Adjust origins

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://jassy:2024_password@localhost/unlimited'  # Replace placeholders
db = SQLAlchemy(app)

# Model for football data (adjust fields as needed)
class FootballData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(80), nullable=False)
    # ... other fields ...

# Route to fetch data from the API and store in the database
@app.route("/api/fetch_data_from_api")
def fetch_data_from_api():
    try:
        api_key = "Ni0UrDY6W6V35SEpaJBdI4bR3vgK9pUHEi2O62JEAv9g333cKb8l38tmBVhb"  # Replace with your Sportmonks API key
        endpoint = "https://api.sportmonks.com/football"  # Adjust endpoint

        headers = {"X-Auth-Token": api_key}
        response = requests.get(endpoint, headers=headers)

        if response.status_code == 200:
            data = response.json()

            # Process and validate data before insertion
            for item in data:
                team_name = item.get("team1Name")
                # ... validate and extract other fields ...

                # Create a model instance and save it to the database
                football_data = FootballData(team_name=team_name, )  # Fill other fields
                db.session.add(football_data)
            db.session.commit()

            return jsonify({"message": "Data fetched and stored in the database"})
        else:
            return jsonify({"error": f"API request failed with status code: {response.status_code}"})

    except Exception as e:
        print(f"Error fetching data from API: {e}")
        return jsonify({"error": "Error fetching data from API"})

if __name__ == "__main__":
    # Create database tables if they don't exist
    db.create_all()
    app.run(debug=True)

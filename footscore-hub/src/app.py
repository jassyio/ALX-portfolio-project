from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask import current_app
import requests

app = Flask(__name__)

# Configure your MySQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://jassy:2024_passwod@localhost/unlimited'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable Flask-SQLAlchemy modification tracking
db = SQLAlchemy(app)
migrate = Migrate(app, db)  # Initialize Flask-Migrate

# Model for Teams table
class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    league_id = db.Column(db.String(10), nullable=False)

# ... (add similar models for other entities, e.g., Score, Standing, News)

# Replace 'YOUR_API_KEY' with your actual football-data.org API key
API_KEY = '0d2f22de8f4e40d3804c8d2b3239ef5b'

# Define the football-data.org API base URL
API_BASE_URL = 'https://api.football-data.org/v4/'

# Example endpoint for fetching subscribed leagues
@app.route('/api/leagues-teams', methods=['GET'])
def get_subscribed_leagues_teams():
    # Replace 'YOUR_SUBSCRIBED_LEAGUES_ENDPOINT' with the actual endpoint providing subscribed leagues
    subscribed_leagues_endpoint = 'https://api.football-data.org/v4/competitions/'
    
    try:
        response = requests.get(subscribed_leagues_endpoint, headers={'X-Auth-Token': API_KEY})
        response.raise_for_status()  # Raise an HTTPError for bad responses
        subscribed_leagues = response.json()
    except requests.exceptions.RequestException as e:
        return {'error': f'Error fetching subscribed leagues: {str(e)}'}

    leagues_teams = []

    for league_id in subscribed_leagues:
        league_teams = get_teams_by_league(league_id['id'])
        leagues_teams.append({'league': league_id['id'], 'teams': league_teams})

    return jsonify(leagues_teams)

def get_teams_by_league(league_id):
    url = f'{API_BASE_URL}competitions/{league_id}/teams'
    headers = {'X-Auth-Token': API_KEY}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        data = response.json()
        
        teams = []

        # Check if the response contains the key 'teams'
        if 'teams' in data:
            for team in data['teams']:
                team_data = {
                    'id': team['id'],
                    'name': team['name'],
                    'shortName': team.get('shortName', ''),
                    'crestUrl': team.get('crestUrl', ''),
                }
                teams.append(team_data)

                # Save teams to the database
                with app.app_context():
                    db_team = Team(
                        id=team_data['id'],
                        name=team_data['name'],
                        league_id=league_id
                    )
                    db.session.add(db_team)
                    db.session.commit()

        return teams

    except requests.exceptions.RequestException as e:
        return {'error': str(e)}  # Return an error message

# ... (add more routes for fetching other data, e.g., scores, standings, news)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables before running the app
    app.run(debug=True)

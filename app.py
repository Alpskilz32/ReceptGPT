from flask import Flask, request, jsonify, render_template
import json
import os

reviews_path = os.path.join(os.getcwd(), 'data', 'reviews.json')

app = Flask(__name__)

# Route to display the index page
@app.route('/', methods=['GET', 'POST'])
def index():
   return render_template('index.html', loading=False)

@app.route('/recipes')
def recipes():
    return render_template('Recipes.html')

@app.route('/gpt')
def gpt():
    return render_template('GPT.html')

@app.route('/about')
def about():
    return render_template('About.html')


# Route to get reviews
@app.route('/reviews', methods=['GET'])
def get_reviews():
   with open(reviews_path, 'r') as f:
       reviews = json.load(f)
   return jsonify(reviews)

# Route to add a new review
@app.route('/reviews', methods=['POST'])
def add_review():
   new_review = request.json
   with open(reviews_path, 'r+') as f:
       reviews = json.load(f)
       reviews.append(new_review)
       f.seek(0)  # Resets file position to the beginning.
       json.dump(reviews, f, indent=4)
       f.truncate()  # Remove remaining part
   return jsonify(new_review), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000 , debug=False)
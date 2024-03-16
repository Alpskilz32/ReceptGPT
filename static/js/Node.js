// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Function to handle form submission
const submitReview = async (req, res) => {
  try {
    const review = req.body;
    reviews.push(review);
    await saveReviews();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to submit review');
  }
}
app.post('/submit-review', submitReview);

app.use(bodyParser.json());

app.post('/save-reviews', (req, res) => {
  const reviews = req.body;

  fs.writeFile('reviews.json', JSON.stringify(reviews), (err) => {
    if (err) {
      console.error('Failed to save reviews:', err);
      res.status(500).send('Failed to save reviews');
      return;
    }
    console.log('Reviews saved successfully');
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

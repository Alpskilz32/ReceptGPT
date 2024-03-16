// Load reviews from JSON file
let reviews = [];

// Function to fetch reviews from JSON file
async function fetchReviews() {
    try {
        const response = await fetch('/reviews');  // Updated to match Flask route
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }
        reviews = await response.json();
        displayReviews();
    } catch (error) {
        console.error(error);
    }
}

// Function to display reviews
function displayReviews() {
    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = '';
    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.classList.add('review');
        reviewDiv.innerHTML = `
            <p><strong>${review.userName}</strong> - ${'★'.repeat(review.stars)}</p>
            <p>${review.reviewText}</p>
        `;
        // Append the review element to the reviews container
        document.getElementById('reviews').appendChild(reviewDiv);
    });
}

// Function to handle form submission
async function submitReview(event) {
    event.preventDefault();

    // Get form values
    const userName = document.getElementById('userName').value.trim();
    const stars = parseInt(document.getElementById('stars').value);
    const reviewText = document.getElementById('reviewText').value.trim();

    // Validate form values
    if (!userName || !stars || stars < 1 || stars > 5 || !reviewText) {
        alert('Please fill in all fields correctly.');
        return;
    }

    // Create review object
    const review = {
        userName,
        stars,
        reviewText
    };

    // Send the new review to the server
    try {
        const response = await fetch('/reviews', {  // Updated to match Flask route for posting reviews
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });
        if (!response.ok) {
            throw new Error('Failed to save review');
        }

        // Clear the input fields after successful submission
        document.getElementById('userName').value = '';
        document.getElementById('stars').value = '';
        document.getElementById('reviewText').value = '';

        // Re-fetch reviews to update the list with the newly added review
        await fetchReviews();

    } catch (error) {
        console.error(error);
    }
}

// Add event listener to form submission
document.getElementById('reviewForm').addEventListener('submit', submitReview);

// Fetch reviews from JSON file on page load
fetchReviews();
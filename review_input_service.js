// Load reviews from JSON file
let reviews = [];

// Function to fetch reviews from JSON file
async function fetchReviews() {
    try {
        const response = await fetch('reviews.json');
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
        reviewsContainer.insertAdjacentHTML('beforeend', reviewDiv.outerHTML);
    });
}

// Function to save reviews to JSON file
async function saveReviews() {
    try {
        const response = await fetch('reviews.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application' },
            body: JSON.stringify(reviews)
        });
        if (!response.ok) {
            throw new Error('Failed to save reviews');
        }
    } catch (error) {
        console.error(error);
    }
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

    // Add review to array
    reviews.push(review);

    // Save reviews to JSON file
    saveReviews();

    // Refresh reviews
    displayReviews();
}


// Add event listener to form submission
document.getElementById('reviewForm').addEventListener('submit', submitReview);

// Fetch reviews from JSON file on page load
fetchReviews();
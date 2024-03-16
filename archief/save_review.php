<?php
// Database connection
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "reviews_database";




// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$review = $_POST['review'];

// SQL to insert review data into the database

$sql = "INSERT INTO user_reviews (name, review) VALUES ('$name', '$review')";

if ($conn->query($sql) === TRUE) {
    echo "Review submitted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

// coonect data to html
include 'get_reviews.php';


?>




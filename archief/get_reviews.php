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

// SQL to fetch reviews from the database
$sql = "CREATE DATABASE reviews_database;";
$result = $conn->query($sql);

// Array to store reviews
$reviews = array();

if ($result->num_rows > 0) {
    // Fetch reviews and add them to the array
    while($row = $result->fetch_assoc()) {
        $reviews[] = $row;
    }
}

// Close connection
$conn->close();

// Send reviews data as JSON response
header('Content-Type: application/json');
echo json_encode($reviews);
?>

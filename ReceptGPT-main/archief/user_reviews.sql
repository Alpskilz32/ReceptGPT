CREATE DATABASE reviews_db;

USE reviews_database;

CREATE TABLE Reviews (
    review_id INTEGER PRIMARY KEY,
    user_name TEXT NOT NULL,
    review_text TEXT NOT NULL,
    stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* This will create an index on the review_id column of the reviews table to help optimize queries that filter by or sort on the review_id
column. Indexes help improve query performance for filtered and sorted queries. */
CREATE INDEX review_id_index ON reviews (review_id);

/* This will create an index on the user_name column of the reviews table to help optimize queries that filter by or sort on the user_name
column. Indexes help improve query performance for filtered and sorted queries. */
CREATE INDEX user_name_index ON reviews (user_name);

/* This will create an index on the review_text column of the reviews table to help optimize queries that filter by or sort on the review_text
column. Indexes help improve query performance for filtered and sorted queries. */
CREATE INDEX review_text_index ON reviews (review_text);


/* This will create an index on the stars column of the reviews table to help optimize queries that filter by or sort on the stars
column. Indexes help improve query performance for filtered and sorted queries. */
CREATE INDEX stars_index ON reviews (stars);

/* This will create an index on the review_date column of the reviews table to help optimize queries that filter by or sort on the review_date
column. Indexes help improve query performance for filtered and sorted queries. */
CREATE INDEX review_date_index ON reviews (review_date);






import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('moviedb.sqlite')
cursor = conn.cursor()

# Load the image file as binary data
with open('AwesomeProject/images/movie1.jpeg', 'rb') as image_file:
    image_data = image_file.read()

# Define the showtimes data as a list of dictionaries
showtimes_data = [
    { 'movie': 'Timeslot 1', 'time': '12:00 PM' },
    { 'movie': 'Timeslot 2', 'time': '3:00 PM' },
    { 'movie': 'Timeslot 3', 'time': '6:00 PM' },
    { 'movie': 'Timeslot 4', 'time': '9:00 PM' }
]

# Convert showtimes data to a formatted string
showtimes_string = ', '.join([f"{entry['movie']} at {entry['time']}" for entry in showtimes_data])

# Insert the data into the 'moviedb' table
cursor.execute("INSERT INTO moviedb (title, image, showtimes, description) VALUES (?, ?, ?, ?)",
               ("Movie2", image_data, showtimes_string, "Description for Movie 2. This is a great movie that you must watch!"))

# Commit the changes and close the database connection
conn.commit()
conn.close()

import sqlite3

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('moviedb.sqlite')

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Define the SQL command to create the 'moviedb' table with a BLOB column for images
create_table_sql = '''
CREATE TABLE IF NOT EXISTS moviedb (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    image BLOB,          -- Store image as binary data (BLOB)
    showtimes TEXT,
    description TEXT
);
'''

# Execute the SQL command to create the table
cursor.execute(create_table_sql)

# Commit the changes and close the database connection
conn.commit()
conn.close()

print("Table 'moviedb' has been created.")

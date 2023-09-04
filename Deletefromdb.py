import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('moviedb.sqlite')
cursor = conn.cursor()

# Define the ID of the record you want to delete
record_id_to_delete = 2

# Execute the DELETE statement
cursor.execute("DELETE FROM moviedb WHERE id=?", (record_id_to_delete,))

# Commit the changes and close the database connection
conn.commit()
conn.close()

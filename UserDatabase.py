import sqlite3

# Connect to the database
db = sqlite3.connect('db.sqlite')
cursor = db.cursor()

try:
    # Drop the table if it exists
    cursor.execute('DROP TABLE IF EXISTS users')

    # Create the table
    cursor.execute('''
        CREATE TABLE users(
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    # Insert sample data
    sample_data = [
        ("admin", "admin@gmail.com", "admin"),
        ("Foo Yoke Wai", "fooyw@roostermail.com", "admin"),
        ("Ng Pei Li", "ngpl@catmail.com", "admin"),
        ("Lim Li Li", "limll@koalamail.com", "admin"),
        ("Mok Sook Chen", "moksc@dogmail.com", "admin"),
    ]

    cursor.executemany('INSERT INTO users(username, email, password) VALUES (?, ?, ?)', sample_data)

    db.commit()

except sqlite3.Error as e:
    print("An error occurred:", e)

finally:
    db.close()

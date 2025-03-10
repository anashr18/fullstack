from langchain_community.utilities import SQLDatabase
import os

# DB_PATH = os.path.abspath("Chinook.db")  # Get absolute path
# print("Using Database Path:", DB_PATH) 

def get_db():
    """Initialize and return the SQLDatabase instance."""
    DB_PATH = "/home/ubuntu/workspace/frontendws/chatmat/backend/database/Chinook.db"
    db = SQLDatabase.from_uri(f"sqlite:///{DB_PATH}")
    print("Database instance created:", db)  # Debugging print
    return db


def test_connection():
    db = get_db()
    print(db.dialect)
    print(db.get_usable_table_names())
    print(db.run("SELECT * FROM Artist LIMIT 10;"))

if __name__ == "__main__":
    test_connection()

# print(db.dialect)
# print(db.get_usable_table_names())
# print(db.run("SELECT * FROM Artist LIMIT 10;"))
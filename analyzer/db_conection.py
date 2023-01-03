from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
def db_conect():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://tesis2w3:7K42UVUbSpGf7JJQ@cluster0.yr8emwe.mongodb.net/?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)
    try:
        # The ping command is cheap and does not require auth.
        client.admin.command('ping')
        print('conexión exitosa')
    except ConnectionFailure:
        print("Server not available")
    return client
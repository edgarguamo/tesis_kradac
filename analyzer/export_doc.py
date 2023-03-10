from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import pandas as pd
import db_conection




def export_json(data):
    client = db_conection.db_conect()
    db = client.test
    collection = db.usuarios_comentarios
    collection.insert_many(data)
    
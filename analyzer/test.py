from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import pprint
import json
import pandas as pd
import db_conection



client = db_conection.db_conect()
db = client.test
collection = db.usuarios_comentarios
cursor = collection.find()
mongo_docs = list(cursor)
mongo_docs = mongo_docs[50:51]
print ("total docs in collection:", collection.count_documents( {} ))
#pprint.pprint(posts.find_one({"IdRegistro": 11}))
print ("series_obj:", mongo_docs)
with open('./datos/resultados.json') as file:
    print(type(file))
    #file_data = json.load(file)

#collection.insert_many(file_data)
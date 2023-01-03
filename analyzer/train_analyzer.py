import db_conection
import pandas as pd

client = db_conection.db_conect()
mydb = client["tesis"]
mycol = mydb["muestra_cliente"]



json_data = mycol.find({}, {"_id": 0,"observación":1, "equivalente":1})

docs = pd.DataFrame(json_data)
print(docs)